import { ChecklistItem } from '../types';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Everyday Habits
  {
    id: 'chk-1',
    category: 'Everyday Habits',
    title: 'Never Share OTPs, PINs or CVVs with Anyone',
    description: 'No genuine bank official, courier partner, or police personnel will EVER ask for your One-Time Password, UPI PIN, or card CVV over the phone or message.',
    priority: 'Critical'
  },
  {
    id: 'chk-2',
    category: 'Everyday Habits',
    title: 'Independently Verify High-Pressure Claims',
    description: 'If a caller claims you are in legal trouble, your account is suspended, or your power will be cut tonight, hang up and verify through official channels.',
    priority: 'Critical'
  },
  {
    id: 'chk-3',
    category: 'Everyday Habits',
    title: 'Inspect Links Before Clicking',
    description: 'Examine the full root domain. Look out for misspelled company names, excessive hyphens, and high-risk domain endings like .xyz, .top, or .click.',
    priority: 'High'
  },
  {
    id: 'chk-4',
    category: 'Everyday Habits',
    title: 'Remember: UPI PIN is Only for Sending Money',
    description: 'You NEVER need to enter your UPI PIN or scan a QR code to receive money from a buyer or claim a refund.',
    priority: 'Critical'
  },

  // Device & Accounts
  {
    id: 'chk-5',
    category: 'Device & Accounts',
    title: 'Enable Two-Factor Authentication (App-based or Passkeys)',
    description: 'Secure your primary Google, Apple, Microsoft, and banking accounts using authenticator apps (Google Authenticator) or FIDO2 Passkeys rather than SMS.',
    priority: 'Critical'
  },
  {
    id: 'chk-6',
    category: 'Device & Accounts',
    title: 'Use Strong, Unique Passwords via a Password Manager',
    description: 'Avoid reusing the same password across multiple sites. Use a password manager with 16+ random characters for each service.',
    priority: 'High'
  },
  {
    id: 'chk-7',
    category: 'Device & Accounts',
    title: 'Never Install Remote Desktop Apps on Request',
    description: 'Refuse to install AnyDesk, TeamViewer, RustDesk, or QuickSupport when instructed by any caller claiming to be tech or customer support.',
    priority: 'Critical'
  },
  {
    id: 'chk-8',
    category: 'Device & Accounts',
    title: 'Disable Unknown APK Installation on Mobile Devices',
    description: 'Keep your smartphone settings configured to block sideloading of third-party Android APK packages outside the official Google Play Store.',
    priority: 'High'
  },

  // Financial & UPI
  {
    id: 'chk-9',
    category: 'Financial & UPI',
    title: 'Configure Daily Transaction Caps on UPI & Cards',
    description: 'Set reasonable daily spending limits (e.g., ₹10,000 to ₹25,000) on your debit cards and UPI apps through your mobile banking settings.',
    priority: 'High'
  },
  {
    id: 'chk-10',
    category: 'Financial & UPI',
    title: 'Disable International Online Transactions When Not Traveling',
    description: 'Turn off international online (e-commerce) usage on your debit/credit cards within your banking app to block foreign card-not-present fraud.',
    priority: 'High'
  },
  {
    id: 'chk-11',
    category: 'Financial & UPI',
    title: 'Save Cyber Crime Helpline 1930 in Your Contacts',
    description: 'Save 1930 in your mobile speed dial so you or family members can report unauthorized bank deductions within the crucial 2-hour golden hour.',
    priority: 'Critical'
  },
  {
    id: 'chk-12',
    category: 'Financial & UPI',
    title: 'Lock Biometrics on UIDAI / Aadhaar Portal',
    description: 'Log into the myAadhaar portal (myaadhaar.uidai.gov.in) and enable biometric lock to prevent unauthorized AePS (Aadhaar Enabled Payment System) withdrawals.',
    priority: 'Recommended'
  },

  // Family Protection
  {
    id: 'chk-13',
    category: 'Family Protection',
    title: 'Establish a Family Emergency Verification Code',
    description: 'Create a confidential word or phrase known only to family members to verify authenticity if someone claims a loved one has been arrested or hospitalized.',
    priority: 'High'
  },
  {
    id: 'chk-14',
    category: 'Family Protection',
    title: 'Educate Elderly Relatives About "Digital Arrest" Scams',
    description: 'Warn senior family members that Indian police and judges never detain citizens or conduct court hearings on WhatsApp or Skype video calls.',
    priority: 'Critical'
  },
  {
    id: 'chk-15',
    category: 'Family Protection',
    title: 'Install Spam-Call Blocking & Caller ID Filters',
    description: 'Set up automated spam and fraud call blocking filters on parents\' phones to screen suspicious international or spoofed calls.',
    priority: 'Recommended'
  },
  {
    id: 'chk-16',
    category: 'Family Protection',
    title: 'Regularly Review Linked Devices on WhatsApp & Telegram',
    description: 'Check WhatsApp Settings > Linked Devices periodically to ensure no unauthorized browser or desktop session is active.',
    priority: 'Recommended'
  }
];
