import { RiskLevel, UrlCheckResult } from '../types';

// High-risk and frequently abused TLDs
const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'click', 'live', 'club', 'loan', 'work', 'rest', 'tk', 'ml', 'ga', 'cf', 'gq',
  'country', 'stream', 'download', 'racing', 'bid', 'win', 'party', 'date', 'faith', 'review'
]);

// Well-known brands frequently targeted by brand spoofing
const SPOOFED_BRANDS = [
  'sbi', 'hdfc', 'icici', 'axis', 'paypal', 'google', 'apple', 'amazon', 'netflix', 'microsoft',
  'indiatimes', 'incometax', 'uidai', 'epfo', 'cybercrime', 'fedex', 'bluedart', 'indiapost', 'whatsapp', 'facebook', 'instagram'
];

export function analyzeUrlSafety(rawUrl: string): UrlCheckResult {
  const trimmed = rawUrl.trim();
  let parsedUrl: URL | null = null;

  let urlToParse = trimmed;
  if (!/^https?:\/\//i.test(urlToParse)) {
    urlToParse = 'http://' + urlToParse;
  }

  try {
    parsedUrl = new URL(urlToParse);
  } catch {
    // Invalid URL format
    return {
      id: `url-${Date.now()}`,
      timestamp: new Date().toISOString(),
      url: trimmed,
      protocol: 'invalid',
      isHttps: false,
      hostname: 'invalid',
      domain: 'invalid',
      tld: '',
      riskLevel: 'High concern',
      riskScore: 90,
      flags: [
        {
          category: 'Syntax Error',
          flag: 'Malformed URL structure',
          severity: 'danger',
          explanation: 'The entered text is not a valid web URL. Malformed links are frequently used in obfuscated attacks.',
        },
      ],
      safeAdvice: [
        'Do not attempt to open malformed or obfuscated links.',
        'Always type the official domain manually into your browser address bar.'
      ],
      isIpAddress: false,
      hasSuspiciousTld: false,
      hasMisleadingSubdomain: false,
    };
  }

  const protocol = parsedUrl.protocol.replace(':', '').toLowerCase();
  const isHttps = protocol === 'https';
  const hostname = parsedUrl.hostname.toLowerCase();
  const pathname = parsedUrl.pathname.toLowerCase();
  const search = parsedUrl.search.toLowerCase();

  const flags: {
    category: string;
    flag: string;
    severity: 'info' | 'warning' | 'danger';
    explanation: string;
  }[] = [];

  let riskScore = 10; // Baseline low risk

  // 1. Check IP address as hostname (e.g., http://192.168.1.1 or http://45.33.2.1/login)
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIpAddress) {
    riskScore += 45;
    flags.push({
      category: 'Hostname Obfuscation',
      flag: 'Raw IP address used instead of domain name',
      severity: 'danger',
      explanation: 'Legitimate institutions almost never direct users to raw IP addresses. This is a common tactic to bypass domain reputation blocklists.',
    });
  }

  // 2. Check Protocol
  if (!isHttps) {
    riskScore += 25;
    flags.push({
      category: 'Insecure Transport',
      flag: 'Unencrypted HTTP Connection',
      severity: 'warning',
      explanation: 'This link uses unencrypted HTTP. Data entered on this page can be intercepted or altered by anyone on the network. Modern legitimate portals enforce HTTPS.',
    });
  }

  // Extract domain parts
  const hostParts = hostname.split('.');
  const tld = hostParts.length > 1 ? hostParts[hostParts.length - 1] : '';
  const domain = hostParts.length >= 2 ? hostParts.slice(-2).join('.') : hostname;

  // 3. Suspicious TLD check
  const hasSuspiciousTld = SUSPICIOUS_TLDS.has(tld);
  if (hasSuspiciousTld) {
    riskScore += 30;
    flags.push({
      category: 'Domain Reputation',
      flag: `High-risk top-level domain (.${tld})`,
      severity: 'warning',
      explanation: `The .${tld} top-level domain is disproportionately favored by disposable phishing campaigns due to low registration fees and lax abuse monitoring.`,
    });
  }

  // 4. Misleading Subdomain / Brand Spoofing Check
  // E.g. "sbi.bank-verify-login.xyz" or "paypal.account-update.top"
  let hasMisleadingSubdomain = false;
  if (hostParts.length > 2) {
    const subdomains = hostParts.slice(0, -2).join('.');
    for (const brand of SPOOFED_BRANDS) {
      if (subdomains.includes(brand) && !domain.startsWith(brand + '.')) {
        hasMisleadingSubdomain = true;
        riskScore += 45;
        flags.push({
          category: 'Brand Impersonation',
          flag: `Deceptive brand name "${brand}" in subdomain`,
          severity: 'danger',
          explanation: `The link places the recognizable name "${brand}" inside a subdomain, but the actual hosting domain is "${domain}". This is a classic phishing technique to deceive mobile users who only see the first few characters.`,
        });
        break;
      }
    }
  }

  // 5. Typosquatting / Character Substitution check
  const typosquatRegex = /(paypa1|arnazon|g00gle|micros0ft|netfl1x|hdfc-bank-login|sbi-net-banking)/i;
  if (typosquatRegex.test(hostname)) {
    riskScore += 40;
    flags.push({
      category: 'Typosquatting',
      flag: 'Visual character substitution detected in domain',
      severity: 'danger',
      explanation: 'The domain mimics a well-known brand by substituting letters with similar-looking numbers (e.g., 0 for O, 1 for l) or appending hyphenated words.',
    });
  }

  // 6. Credential harvesting path keywords
  const credentialPaths = /(\/login|\/signin|\/verify|\/otp|\/update-pan|\/kyc|\/recover|\/password-reset|\/banking)/i;
  if (credentialPaths.test(pathname) || credentialPaths.test(search)) {
    if (riskScore > 25) {
      riskScore += 20;
      flags.push({
        category: 'Sensitive Action Path',
        flag: 'Authentication or KYC endpoint keywords in URL',
        severity: 'warning',
        explanation: 'The URL path specifically directs to a login, credential verification, or KYC capture form while hosted on an unverified domain.',
      });
    }
  }

  // 7. Excessive hyphenation or subdomains (e.g. secure-login-bank-verification.com)
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 3) {
    riskScore += 15;
    flags.push({
      category: 'Domain Anomaly',
      flag: 'Excessive hyphenation in hostname',
      severity: 'warning',
      explanation: 'Fraudulent domains often chain multiple security keywords with hyphens (e.g., "secure-login-update-account") to look convincing.',
    });
  }

  // Safe checks if nothing triggered
  if (flags.length === 0) {
    flags.push({
      category: 'Standard Protocol',
      flag: 'Valid HTTPS protocol and standard domain structure',
      severity: 'info',
      explanation: 'No overt deceptive subdomains, suspicious TLDs, or IP-based hosting patterns were found in the URL structure.',
    });
  }

  // Normalize score
  const finalScore = Math.min(100, Math.max(5, riskScore));
  let riskLevel: RiskLevel = 'Low apparent risk';
  if (finalScore >= 60) {
    riskLevel = 'High concern';
  } else if (finalScore >= 30) {
    riskLevel = 'Caution';
  }

  const safeAdvice = [
    'Preliminary Check: This analysis inspects URL structure and syntax heuristics. It does not replace live threat intelligence.',
    'Best Practice: Never click links received in SMS or chat. Instead, open a new browser tab and manually type the known official address (e.g. sbi.co.in, hdfcbank.com, indiapost.gov.in).',
    'Look at the Root Domain: Always inspect what appears immediately before the top-level domain (.com, .in, .gov.in), ignoring deceptive subdomains.'
  ];

  if (riskLevel === 'High concern') {
    safeAdvice.unshift('🚨 DO NOT OPEN: This URL displays heavy indicators of phishing or brand impersonation.');
  }

  return {
    id: `url-${Date.now()}`,
    timestamp: new Date().toISOString(),
    url: trimmed,
    protocol,
    isHttps,
    hostname,
    domain,
    tld,
    riskLevel,
    riskScore: finalScore,
    flags,
    safeAdvice,
    isIpAddress,
    hasSuspiciousTld,
    hasMisleadingSubdomain,
  };
}
