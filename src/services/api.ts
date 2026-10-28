import { MessageAnalysisResult } from '../types';
import { analyzeMessageHeuristically } from './analyzer';

export async function checkMessageWithAIOrHeuristics(messageText: string): Promise<MessageAnalysisResult> {
  const localAnalysis = analyzeMessageHeuristically(messageText);

  // Setup client-side AbortController with a 7.5 second timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 7500);

  try {
    const res = await fetch('/api/check-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorMsg = `Server returned HTTP ${res.status}. Switched to local rule-based analysis.`;
      if (res.status === 429) {
        errorMsg = 'AI quota limit exceeded (HTTP 429). Switched to local rule-based analysis.';
      } else if (res.status === 401 || res.status === 403) {
        errorMsg = 'AI authentication error. Switched to local rule-based analysis.';
      }

      return {
        ...localAnalysis,
        isAiPowered: false,
        modelUsed: 'ScamShield Rule-Based Engine (Fallback)',
        fallbackReason: errorMsg,
      };
    }

    const data = await res.json();

    // Check if server indicated fallback or failure
    if (data.fallbackToRules || !data.aiAvailable || !data.analysis) {
      const reason = data.error || 'AI analysis could not complete. Switched to local rule-based analysis.';
      return {
        ...localAnalysis,
        isAiPowered: false,
        modelUsed: 'ScamShield Rule-Based Engine (Fallback)',
        fallbackReason: reason,
      };
    }

    // AI Analysis succeeded
    const aiData = data.analysis;
    return {
      id: `scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      messagePreview: messageText.slice(0, 140) + (messageText.length > 140 ? '...' : ''),
      riskLevel: aiData.riskLevel || localAnalysis.riskLevel,
      confidenceScore: typeof aiData.confidenceScore === 'number' ? aiData.confidenceScore : localAnalysis.confidenceScore,
      scamType: aiData.scamType || localAnalysis.scamType,
      detectedTactics: Array.isArray(aiData.detectedTactics) && aiData.detectedTactics.length > 0
        ? aiData.detectedTactics
        : localAnalysis.detectedTactics,
      detailedExplanation: aiData.detailedExplanation || localAnalysis.detailedExplanation,
      practicalSteps: Array.isArray(aiData.practicalSteps) && aiData.practicalSteps.length > 0
        ? aiData.practicalSteps
        : localAnalysis.practicalSteps,
      warningQuotes: Array.isArray(aiData.warningQuotes) && aiData.warningQuotes.length > 0
        ? aiData.warningQuotes
        : localAnalysis.warningQuotes,
      isAiPowered: true,
      modelUsed: 'Gemini 3.8 Flash (Neural Cybersecurity Analysis)',
    };
  } catch (error: any) {
    clearTimeout(timeoutId);

    let fallbackReason = 'Network error contacting AI server. Switched to local rule-based analysis.';
    if (error?.name === 'AbortError') {
      fallbackReason = 'AI analysis request timed out after 7.5s. Switched to instant rule-based findings.';
    } else if (error?.message) {
      fallbackReason = `${error.message}. Switched to local rule-based analysis.`;
    }

    console.warn('Backend message check fallback:', fallbackReason);

    return {
      ...localAnalysis,
      isAiPowered: false,
      modelUsed: 'ScamShield Rule-Based Engine (Fallback)',
      fallbackReason,
    };
  }
}

export async function sendChatMessage(messages: { role: string; content: string }[]): Promise<{ reply: string; isAi: boolean }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 7500);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Chat API HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      reply: data.reply || 'Please be vigilant against suspicious messages and never share OTPs.',
      isAi: !!data.aiAvailable,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn('Chat request fallback:', err);
    const lastMsg = messages[messages.length - 1]?.content.toLowerCase() || '';

    let fallbackReply = "ScamShield Safety Advisory: ";
    if (lastMsg.includes('digital arrest') || lastMsg.includes('police') || lastMsg.includes('cbi')) {
      fallbackReply += "No law enforcement agency in India conducts arrests over WhatsApp or Skype video calls. 'Digital Arrest' is completely fake. Immediately hang up, block the number, and dial 1930.";
    } else if (lastMsg.includes('otp') || lastMsg.includes('pin')) {
      fallbackReply += "Never share OTPs or enter your UPI PIN to receive money. UPI PIN is only required for sending/debiting money.";
    } else if (lastMsg.includes('loss') || lastMsg.includes('scammed') || lastMsg.includes('money')) {
      fallbackReply += "Call National Cybercrime Helpline 1930 immediately! Contact your bank immediately within the first 2 hours ('golden hour') to freeze the transaction before fraudsters withdraw the funds.";
    } else {
      fallbackReply += "Always verify unexpected callers, never click unverified links, keep 2FA enabled on all accounts, and report cyber incidents at cybercrime.gov.in.";
    }

    return {
      reply: fallbackReply,
      isAi: false,
    };
  }
}
