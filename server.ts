import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT || '3000', 10);

// Initialize Gemini client if API key is provided
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!ai,
    timestamp: new Date().toISOString(),
    service: 'ScamShield Security Engine'
  });
});

// AI Message Check endpoint
app.post('/api/check-message', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ error: 'Message content is required for analysis.' });
    return;
  }

  if (!ai) {
    res.json({
      aiAvailable: false,
      error: 'GEMINI_API_KEY is not configured on the server. Falling back to local heuristic analysis.',
      fallbackToRules: true,
    });
    return;
  }

  try {
    const prompt = `You are a cybersecurity expert analyzing potential scam and phishing messages.
Evaluate the following user-submitted message for scam indicators, fraud patterns, and psychological manipulation:

Message:
"""
${message.slice(0, 2000)}
"""

Provide your assessment strictly in the following JSON format:
{
  "riskLevel": "Low apparent risk" | "Caution" | "High concern",
  "confidenceScore": number between 0 and 100,
  "scamType": string,
  "detectedTactics": [string],
  "detailedExplanation": string,
  "practicalSteps": [string],
  "warningQuotes": [string]
}

Important: Return ONLY valid JSON with no markdown formatting.`;

    // 6.5-second timeout wrapper to prevent hanging requests
    const timeoutPromise = new Promise<never>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error('AI_TIMEOUT'));
      }, 6500);
    });

    const aiCallPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        temperature: 0.1,
      },
    });

    const response = await Promise.race([aiCallPromise, timeoutPromise]);
    let responseText = response.text || '{}';

    // Strip any markdown codeblock wraps if present
    responseText = responseText.trim();
    if (responseText.startsWith('```')) {
      responseText = responseText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }

    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = {
        riskLevel: 'Caution',
        confidenceScore: 70,
        scamType: 'Potential Phishing / Scam',
        detectedTactics: ['Suspicious phrasing detected by AI'],
        detailedExplanation: responseText,
        practicalSteps: [
          'Do not click any embedded links.',
          'Never share OTPs, PINs, or card details.',
          'Verify with the official organization through their verified website.'
        ],
        warningQuotes: []
      };
    }

    res.json({
      aiAvailable: true,
      analysis: parsedData,
    });
  } catch (error: any) {
    console.error('Gemini message analysis error:', error);

    const errMsg = error?.message || String(error);
    const status = error?.status || 500;

    let userFacingError = 'AI service temporarily unavailable. Falling back to local heuristic analysis.';
    let isTimeout = false;
    let isQuota = false;
    let isAuth = false;

    if (errMsg === 'AI_TIMEOUT' || errMsg.includes('timeout') || errMsg.includes('DEADLINE_EXCEEDED')) {
      userFacingError = 'AI response exceeded 6.5s timeout limit. Switched to instant rule-based findings.';
      isTimeout = true;
    } else if (status === 429 || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
      userFacingError = 'Gemini API quota or rate limit reached. Switched to rule-based analysis.';
      isQuota = true;
    } else if (status === 400 || status === 401 || status === 403 || errMsg.includes('API_KEY_INVALID')) {
      userFacingError = 'Gemini API authentication issue. Switched to rule-based analysis.';
      isAuth = true;
    }

    res.status(200).json({
      aiAvailable: false,
      error: userFacingError,
      isTimeout,
      isQuota,
      isAuth,
      fallbackToRules: true,
    });
  }
});

// AI Safety Assistant Chatbot endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Valid messages array is required.' });
      return;
    }

    const latestMessage = messages[messages.length - 1]?.content;

    if (!ai) {
      // Offline fallback responder with educational cybersecurity guidance
      const lower = latestMessage.toLowerCase();
      let reply = "I am ScamShield's Cybersecurity Assistant. ";

      if (lower.includes('digital arrest') || lower.includes('police') || lower.includes('cbi') || lower.includes('narcotics')) {
        reply += "⚠️ **Warning about Digital Arrests:** In India, police, CBI, ED, or customs NEVER place citizens under 'digital arrest' or interrogate via WhatsApp video calls. Legitimate law enforcement issues formal physical summons. If you receive such a call, hang up immediately, block the number, and dial **1930** or report to **cybercrime.gov.in**.";
      } else if (lower.includes('otp') || lower.includes('pin') || lower.includes('password')) {
        reply += "🔒 **Golden Rule of OTPs:** Never share your One-Time Password (OTP) or UPI PIN with anyone, even if they claim to be your bank manager, courier delivery agent, or customer support. Banks and payment apps NEVER ask for OTPs or PINs to receive money or cancel orders.";
      } else if (lower.includes('job') || lower.includes('telegram') || lower.includes('task') || lower.includes('youtube like')) {
        reply += "💼 **Task & Job Scam Alert:** Legitimate companies never pay you for liking YouTube videos, reviewing hotels on Google Maps, or ask you to deposit money in prepaid 'recharge' tasks. These are classic Ponzi/task scams designed to trap your funds in fake dashboards.";
      } else if (lower.includes('clicked') || lower.includes('link') || lower.includes('lost money') || lower.includes('scammed')) {
        reply += "🚨 **Immediate Incident Response:**\n1. Call the Indian Cybercrime Helpline **1930** immediately (first 2-3 hours are critical to freeze accounts).\n2. Contact your bank to hotlist/freeze your compromised debit card or UPI handle.\n3. File a detailed report at **cybercrime.gov.in** with transaction IDs and screenshots.\n4. Disconnect from Wi-Fi and run an antivirus scan if an APK/file was downloaded.";
      } else if (lower.includes('qr') || lower.includes('upi')) {
        reply += "📱 **UPI / QR Code Safety:** Remember: You enter your UPI PIN ONLY to SEND money, NEVER to receive money. Scanning a QR code or entering a PIN will always debit your account, never credit it.";
      } else {
        reply += "To protect your digital identity, remember the core principles: verify callers through official numbers, never rush under artificial deadlines, inspect links before clicking, and report incidents promptly to 1930.";
      }

      res.json({
        reply,
        aiAvailable: false,
      });
      return;
    }

    // Prepare system instruction & conversation
    const systemInstruction = `You are ScamShield AI, an authoritative, empathetic cybersecurity advisor and scam prevention mentor built for the PromptWars × Kick To Tech 2026 hackathon (Track 3: Cybersecurity & Digital Safety).
Your mission is to help users identify frauds, evaluate suspicious messages, secure compromised accounts, and take safe immediate action.

Guidelines:
1. Always prioritize user safety and practical defensive steps.
2. If the user mentions financial loss or being actively defrauded, immediately highlight the Indian Cybercrime Helpline **1930** and **https://cybercrime.gov.in/**, and urge them to contact their bank within the 'golden hour' to freeze accounts.
3. NEVER ask for passwords, OTPs, Aadhaar numbers, card numbers, or sensitive credentials. If the user shares sensitive data, warn them to delete it.
4. Keep answers concise, formatted with clear bullet points, bold key terms, and easy-to-follow steps.
5. Emphasize that digital arrests, sudden courier customs duties, and prepaid Telegram tasks are ALWAYS scams.`;

    // Format contents
    const promptWithHistory = `System Context: ${systemInstruction}\n\nUser Question:\n${latestMessage}`;

    const chatTimeoutPromise = new Promise<never>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error('CHAT_TIMEOUT'));
      }, 6500);
    });

    const chatCallPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptWithHistory,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        temperature: 0.2,
      },
    });

    const response = await Promise.race([chatCallPromise, chatTimeoutPromise]);

    res.json({
      reply: response.text || "I couldn't process your request. Please exercise caution with any unverified messages.",
      aiAvailable: true,
    });
  } catch (error) {
    console.error('Chat error:', error);
    // Return smart fallback guidance rather than 500 error
    const lower = (req.body?.messages?.[req.body.messages.length - 1]?.content || '').toLowerCase();
    let fallbackGuidance = "⚠️ ScamShield Cybersecurity Advisory: ";
    if (lower.includes('digital arrest') || lower.includes('police') || lower.includes('cbi')) {
      fallbackGuidance += "No Indian police, CBI, or court conducts 'digital arrests' over WhatsApp video calls. Hang up immediately and dial 1930.";
    } else if (lower.includes('otp') || lower.includes('pin')) {
      fallbackGuidance += "Never share OTPs or UPI PINs. Entering a UPI PIN always debits funds from your account.";
    } else {
      fallbackGuidance += "Never rush into unverified transfers under artificial deadlines. Verify callers through official websites and report cyber incidents at cybercrime.gov.in.";
    }

    res.json({
      reply: fallbackGuidance,
      aiAvailable: false,
      note: 'Response generated via offline heuristic advisory due to AI latency or network limit.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ScamShield server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
