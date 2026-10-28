import { MessageAnalysisResult, RiskLevel } from '../types';

interface HeuristicPattern {
  name: string;
  category: string;
  regex: RegExp;
  weight: number; // 5 to 40
  severity: 'low' | 'medium' | 'high';
  explanation: string;
}

const HEURISTIC_PATTERNS: HeuristicPattern[] = [
  // 1. Digital Arrest & Law Enforcement Impersonation (Extreme threat in India)
  {
    name: 'Digital Arrest / Police Extortion',
    category: 'Authority Impersonation',
    regex: /(digital arrest|cbi|narcotics bureau|ncb|mumbai police|delhi police|cyber cell|arrest warrant|fir registered|customs officer|money laundering case|illegal parcel contains drugs)/i,
    weight: 45,
    severity: 'high',
    explanation: 'Uses fear of law enforcement, fake arrest warrants, or "digital arrest" video call threats to extort money.',
  },
  // 2. Urgent KYC / Account Suspension
  {
    name: 'Urgent KYC / Account Freeze Threat',
    category: 'Urgency & Banking Coercion',
    regex: /(kyc (expired|pending|suspended|blocked)|account (will be|has been) (blocked|deactivated|frozen)|pan card not linked|immediate action required|within (24|12|2) hours|last reminder|service discontinued)/i,
    weight: 35,
    severity: 'high',
    explanation: 'Creates artificial panic claiming your bank account or SIM card will be deactivated unless you click or update immediately.',
  },
  // 3. Credential & OTP Harvesting
  {
    name: 'Credential & OTP Harvesting',
    category: 'Credential Theft',
    regex: /(share otp|send (the )?otp|one time password|enter (your )?(pin|password|cvv|card expiry|netbanking password)|verify your credentials|login to prevent)/i,
    weight: 40,
    severity: 'high',
    explanation: 'Directly asks for sensitive authentication factors (OTP, PIN, CVV) that organizations strictly advise never to disclose.',
  },
  // 4. Fake Task & Telegram Job Scams
  {
    name: 'Prepaid Task / Work-From-Home Scam',
    category: 'Employment Fraud',
    regex: /(earn (\u20B9|\$|rs\.?)\s*[0-9]+.*(per day|daily)|like youtube videos|subscribe channels|hotel review task|telegram channel|recharge task|part-time job vacancy|guaranteed daily income|work 1-2 hours)/i,
    weight: 35,
    severity: 'high',
    explanation: 'Promises unrealistic income for trivial tasks (liking videos, reviewing hotels) to lure victims into depositing money in fake task dashboards.',
  },
  // 5. Parcel Delivery / Customs Fee Bait
  {
    name: 'Parcel Delivery / Unpaid Address Fee',
    category: 'Delivery Fraud',
    regex: /(package (could not|cannot) be delivered|incomplete address|update address link|pay redelivery fee|customs duty pending|india post|bluedart|fedex|dhl parcel hold)/i,
    weight: 30,
    severity: 'medium',
    explanation: 'Claims a package cannot be delivered due to missing house numbers or unpaid nominal fees, leading to phishing portals.',
  },
  // 6. Suspicious / Shortened Links
  {
    name: 'Suspicious Domain or Link Shortener',
    category: 'Malicious Link Risk',
    regex: /(bit\.ly\/|tinyurl\.com\/|is\.gd\/|t\.co\/|cutt\.ly\/|\.xyz|\.top|\.ru|\.su|\.tk|\.live\/|\.click\/|apk download|install (our|this) app)/i,
    weight: 25,
    severity: 'high',
    explanation: 'Uses unverified link shorteners or unusual high-risk domains (.xyz, .top) that hide the actual destination server or prompt APK downloads.',
  },
  // 7. Unsolicited Prizes, Lotteries & Crypto
  {
    name: 'Lottery / Cash Reward / Crypto Scheme',
    category: 'Financial Bait',
    regex: /(congratulations! you won|cashback of (\u20B9|\$|rs\.?)|lottery winner|kaun banega crorepati|kbc lottery|crypto (arbitrage|doubler|mining profit)|claim your prize)/i,
    weight: 35,
    severity: 'high',
    explanation: 'Allures the victim with sudden unexpected windfalls or lottery prizes that require an advance "processing fee" or tax to claim.',
  },
  // 8. Electricity Bill Disconnection
  {
    name: 'Utility Disconnection Extortion',
    category: 'Utility Scam',
    regex: /(electricity (bill|power) will be disconnected|tonight at 9:30 pm|contact electricity officer|call this number immediately to avoid power cut)/i,
    weight: 35,
    severity: 'high',
    explanation: 'Impersonates power distribution boards claiming imminent power cut unless an unverified number is phoned immediately.',
  },
  // 9. QR Code / UPI Reversal Scam
  {
    name: 'UPI / QR Code Reverse Payment Trap',
    category: 'Payment Trap',
    regex: /(scan this qr code to receive|enter pin to accept payment|refund initiated click here|pay (\u20B9|\$|rs\.?)\s*1 to verify)/i,
    weight: 35,
    severity: 'high',
    explanation: 'Falsely claims you must scan a QR code or enter your UPI PIN to receive money. In reality, entering a PIN always deducts money.',
  },
];

export function analyzeMessageHeuristically(messageText: string): MessageAnalysisResult {
  const cleanText = messageText.trim();
  const lowerText = cleanText.toLowerCase();

  let totalScore = 0;
  const detectedTactics: string[] = [];
  const warningQuotes: string[] = [];
  const primaryThreats: string[] = [];

  for (const pattern of HEURISTIC_PATTERNS) {
    const match = lowerText.match(pattern.regex);
    if (match) {
      totalScore += pattern.weight;
      detectedTactics.push(`${pattern.name} (${pattern.category})`);
      primaryThreats.push(pattern.category);

      // Extract matching phrase snippet
      const matchedSnippet = match[0];
      if (!warningQuotes.includes(matchedSnippet)) {
        warningQuotes.push(matchedSnippet);
      }
    }
  }

  // Check for safe/legitimate signals to calibrate false positives
  const safeSignals = /(meeting agenda|attached invoice for your review|quarterly performance review|team standup link|ticket #\d+ has been resolved|order confirmed and shipped on|delivery estimated by)/i;
  if (safeSignals.test(lowerText) && totalScore < 30) {
    totalScore = Math.max(5, totalScore - 15);
  }

  // Cap score 0 - 100
  const normalizedScore = Math.min(100, Math.max(5, totalScore));

  let riskLevel: RiskLevel = 'Low apparent risk';
  if (normalizedScore >= 60) {
    riskLevel = 'High concern';
  } else if (normalizedScore >= 25) {
    riskLevel = 'Caution';
  }

  // Determine scam type classification
  let scamType = 'Routine Communication';
  if (primaryThreats.includes('Authority Impersonation')) {
    scamType = 'Digital Arrest & Law Enforcement Extortion';
  } else if (primaryThreats.includes('Credential Theft')) {
    scamType = 'Phishing Credential & OTP Harvesting';
  } else if (primaryThreats.includes('Urgency & Banking Coercion')) {
    scamType = 'Bank KYC & Account Freeze Threat';
  } else if (primaryThreats.includes('Employment Fraud')) {
    scamType = 'Prepaid Task / Job Offer Scam';
  } else if (primaryThreats.includes('Delivery Fraud')) {
    scamType = 'Parcel Impersonation & Address Update Phish';
  } else if (primaryThreats.includes('Utility Scam')) {
    scamType = 'Utility Bill Disconnection Scam';
  } else if (primaryThreats.includes('Financial Bait')) {
    scamType = 'Lottery / Prize Advance-Fee Fraud';
  } else if (primaryThreats.includes('Payment Trap')) {
    scamType = 'UPI / QR Code Reversal Fraud';
  } else if (riskLevel !== 'Low apparent risk') {
    scamType = 'Suspicious Social Engineering Message';
  }

  // Generate explanation
  let detailedExplanation = '';
  if (riskLevel === 'High concern') {
    detailedExplanation = `This message contains critical red flags commonly seen in fraudulent schemes (${detectedTactics.slice(0, 2).join(', ')}). Fraudsters frequently employ artificial urgency, impersonate authoritative bodies, or coerce victims into clicking unverified links or sharing confidential OTPs/PINs.`;
  } else if (riskLevel === 'Caution') {
    detailedExplanation = `This message contains certain elements (${detectedTactics.join(', ') || 'unverified claims'}) that warrant caution. While not definitively malicious, verify the source independently through official contact channels before sharing data or clicking links.`;
  } else {
    detailedExplanation = `No acute phishing patterns, extortion demands, or OTP requests were detected in this sample. However, this is an automated heuristic estimate and not a guarantee of legitimacy. Always verify unexpected communications independently.`;
  }

  // Practical next steps
  const practicalSteps: string[] = [];
  if (riskLevel === 'High concern') {
    practicalSteps.push('DO NOT click any link, scan QR codes, or download attached APK files.');
    practicalSteps.push('Never share OTPs, PINs, or bank account credentials with any caller or sender.');
    practicalSteps.push('If threatened with legal action or "digital arrest", hang up immediately and report to cybercrime.gov.in or helpline 1930.');
    practicalSteps.push('Block the sender phone number or email address on your device.');
  } else if (riskLevel === 'Caution') {
    practicalSteps.push('Open your browser and manually visit the official website rather than using links in the message.');
    practicalSteps.push('Call the official customer support line found on the back of your card or verified website.');
    practicalSteps.push('Ask yourself if you requested this interaction or if it arrived unexpectedly.');
  } else {
    practicalSteps.push('Maintain standard hygiene: check the true sender email domain or phone prefix.');
    practicalSteps.push('Never forward sensitive personal identifiers over unencrypted SMS or public channels.');
  }

  return {
    id: `scan-${Date.now()}`,
    timestamp: new Date().toISOString(),
    messagePreview: cleanText.slice(0, 140) + (cleanText.length > 140 ? '...' : ''),
    riskLevel,
    confidenceScore: normalizedScore,
    scamType,
    detectedTactics: detectedTactics.length > 0 ? detectedTactics : ['No overt scam heuristics matched'],
    detailedExplanation,
    practicalSteps,
    warningQuotes,
    isAiPowered: false,
    modelUsed: 'ScamShield Rule-Based Cybersecurity Engine v2.4',
  };
}
