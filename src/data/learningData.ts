import { LearningArticle } from '../types';

export const LEARNING_ARTICLES: LearningArticle[] = [
  {
    id: 'art-1',
    title: 'Anatomy of "Digital Arrest" & Police Extortion Scams',
    category: 'Banking',
    readTime: '5 min read',
    summary: 'How organized syndicates impersonate Mumbai Police, CBI, NCB, and the Enforcement Directorate to psychologically detain victims over video calls and extort life savings.',
    realWorldImpact: 'According to the Ministry of Home Affairs (I4C), Indian citizens lost over ₹1,205 Crore to digital arrest scams in the first 10 months of 2024 alone, targeting senior citizens, working professionals, and retired defence personnel.',
    commonTactics: [
      'Interactive IVR calls claiming your mobile number will be disconnected due to illegal activities.',
      'Call transferred to purported "Cyber Crime Officer" or "CBI Inspector" on Skype or WhatsApp.',
      'Fraudsters wearing replica police uniforms sitting in front of mock interrogation sets with institutional banners.',
      'Displaying fake arrest warrants, Supreme Court summons, and forged letters carrying national emblems.',
      'Placing the victim under "Digital Arrest" and demanding they stay in front of the camera for 24-48 hours.',
      'Coercing the victim into transferring their deposits into "RBI Government Clearance / Verification Accounts".'
    ],
    redFlagChecklist: [
      'Any law enforcement agency calling via WhatsApp, Skype, or Telegram.',
      'The term "Digital Arrest" — which does NOT exist anywhere in Indian law or CrPC.',
      'Strict instructions not to tell family members, local police, or bank staff.',
      'Demands to transfer money for "anti-money laundering clearance" or "temporary bail".'
    ],
    preventionSteps: [
      'Remember: Real police officers serve physical summons at your registered address, never via WhatsApp.',
      'If someone calls claiming to be from the police, immediately disconnect and dial 1930.',
      'Never transfer money to any account for "verification" — the government never operates verification bank accounts.',
      'Inform trusted family members immediately if you receive such intimidation.'
    ],
    whatToDoIfVictim: [
      'Call 1930 within the first 2 hours ("golden hour") to freeze the beneficiary bank accounts.',
      'File an immediate FIR at cybercrime.gov.in with bank account numbers and transaction IDs.',
      'Contact your bank manager to mark the transactions as unauthorized extortion.',
      'Preserve call recordings, screenshots, and UPI reference numbers for police evidence.'
    ],
    officialHelplineNote: 'Dial 1930 immediately or visit https://cybercrime.gov.in/ for National Cybercrime Reporting.'
  },
  {
    id: 'art-2',
    title: 'Prepaid Task, YouTube Likes & Fake Employment Frauds',
    category: 'Employment',
    readTime: '4 min read',
    summary: 'The modern evolution of job scams offering daily earnings of ₹3,000–₹10,000 for simple social media tasks, leading to high-value deposit traps.',
    realWorldImpact: 'Over 40% of financial fraud complaints registered by younger Indians (ages 18-35) originate from fraudulent work-from-home and task-based schemes originating on WhatsApp and Telegram.',
    commonTactics: [
      'Unsolicited WhatsApp/SMS job offers from "HR recruiters" claiming affiliation with Google, Amazon, or media agencies.',
      'Initial trivial tasks: liking 3 YouTube videos or leaving 5-star hotel reviews on Google Maps.',
      'Paying a real token reward of ₹150–₹500 to the victim\'s UPI account to build credibility.',
      'Inviting the victim to a Telegram VIP group with shill members posting fake earnings.',
      'Introducing "Prepaid Investment Tasks": pay ₹5,000 to earn ₹7,500; pay ₹50,000 to earn ₹80,000.',
      'Locking the victim\'s money in a fake web dashboard and demanding further "credit repair fees" to withdraw.'
    ],
    redFlagChecklist: [
      'Unsolicited job offer via messaging apps without a resume or interview.',
      'Astronomical pay for effortless repetitive tasks.',
      'Any job that requires YOU to deposit money or pay "recharge fees" to work.',
      'Migration of communication to anonymous Telegram or WhatsApp groups.'
    ],
    preventionSteps: [
      'Recognize that no legitimate enterprise pays people to manipulate online reviews or like videos.',
      'Never deposit money with an employer under the guise of security deposits, software keys, or prepaid tasks.',
      'Research companies on official platforms (LinkedIn, official domain careers page).'
    ],
    whatToDoIfVictim: [
      'Stop depositing further money immediately — paying "unlock fees" will never retrieve your funds.',
      'Document all transaction UTR numbers and UPI IDs.',
      'File a complaint on cybercrime.gov.in specifying the Telegram group IDs and bank coordinates.',
      'Report and block the Telegram accounts and channels.'
    ],
    officialHelplineNote: 'Report fake recruitment agencies to the National Career Service (NCS) portal and 1930.'
  },
  {
    id: 'art-3',
    title: 'Parcel Delivery & Address Verification Phishing (India Post, FedEx)',
    category: 'Delivery',
    readTime: '4 min read',
    summary: 'Deceptive SMS alerts claiming your package cannot be delivered due to missing house numbers or unpaid nominal fees, leading to credential harvesting.',
    realWorldImpact: 'Courier scams surge by over 300% during festive seasons (Diwali, New Year) as millions of consumers anticipate online shopping deliveries.',
    commonTactics: [
      'SMS with spoofed headers like "VM-INDPST" or ordinary 10-digit mobile numbers.',
      'Message claiming: "Address incomplete, package held at sorting hub, update within 24 hours".',
      'Embedded phishing link directing to a fake replica portal (e.g., indiapost-tracking.top).',
      'The portal asks for full name, address, and a tiny "rescheduling fee" of ₹5 or ₹10.',
      'When you enter your credit card or debit card details, the website captures your card number, CVV, and OTP for an unauthorized high-value international charge.'
    ],
    redFlagChecklist: [
      'Link using unofficial domain extensions (.xyz, .top, .site, .click) instead of .gov.in.',
      'Urgent deadline ("update within 12 hours or return to sender").',
      'Requests for debit/credit card CVV or OTP to pay a nominal re-delivery fee.'
    ],
    preventionSteps: [
      'Always inspect the domain hierarchy: India Post will ONLY ever use indiapost.gov.in.',
      'Never click links in delivery SMS messages. Copy the tracking ID and enter it on the carrier\'s official app.',
      'Legitimate postal delivery staff do not require online credit card payments for normal parcels.'
    ],
    whatToDoIfVictim: [
      'Immediately lock or block your debit/credit card via your banking app.',
      'Call your bank\'s 24/7 card helpline to report unauthorized online card usage.',
      'Request card replacement with new card number and CVV.',
      'Report the phishing URL to CERT-In (incident@cert-in.org.in).'
    ],
    officialHelplineNote: 'Report phishing links directly to CERT-In and Indian Cybercrime Reporting Portal 1930.'
  },
  {
    id: 'art-4',
    title: 'UPI & QR Code Reverse Payment Traps',
    category: 'Payments',
    readTime: '4 min read',
    summary: 'The critical difference between sending and receiving money on UPI, and how fraudsters deceive sellers on OLX and Facebook Marketplace.',
    realWorldImpact: 'UPI fraud accounts for nearly 47% of all retail digital payment complaints in India due to widespread misconception regarding QR code scanning.',
    commonTactics: [
      'Buyer contacts you enthusiastically about buying an item listed on classifieds.',
      'Claims they are a business or military officer who can only pay via "Merchant UPI QR Code".',
      'Sends a QR code image via WhatsApp and instructs you to "Scan this in GPay to receive your ₹10,000".',
      'The QR code is actually a "Collect Request" that requests money FROM you.',
      'When prompted for your UPI PIN, the victim enters it, instantly transferring money out of their own bank account.'
    ],
    redFlagChecklist: [
      'Anyone asking you to scan a QR code to RECEIVE money.',
      'Any prompt asking for your 4-digit or 6-digit UPI PIN during an incoming payment.',
      'Claims of sending ₹1 first "for verification" followed by an urgent reversal request.'
    ],
    preventionSteps: [
      'GOLDEN RULE: You enter your UPI PIN ONLY to send money. You NEVER enter a PIN to receive funds.',
      'Receiving money on UPI requires only sharing your registered mobile number or UPI ID (e.g., name@okhdfcbank).',
      'Never scan QR codes sent via WhatsApp from buyers you have not met in person.'
    ],
    whatToDoIfVictim: [
      'Immediately tap "Report Fraud" directly inside your payment app (GPay, PhonePe, Paytm).',
      'Call your bank\'s UPI grievance cell and file a transaction dispute.',
      'Call 1930 with the UPI Transaction ID, UTR number, and beneficiary UPI handle.'
    ],
    officialHelplineNote: 'Report UPI fraud immediately on 1930 and through the NPCI dispute resolution mechanism.'
  },
  {
    id: 'art-5',
    title: 'Bank KYC Expiration & Account Suspension Extortion',
    category: 'Banking',
    readTime: '5 min read',
    summary: 'How scammers exploit fear of bank account freezes to steal net banking user IDs, passwords, and two-factor authentication OTPs.',
    realWorldImpact: 'RBI guidelines mandate periodic KYC updates, and fraudsters weaponize these official compliance cycles by inundating consumers with fake deactivation warnings.',
    commonTactics: [
      'SMS text claiming your SBI, HDFC, or ICICI account has been blocked due to non-updated PAN/Aadhaar.',
      'Includes an urgent link with bank keywords (e.g., sbi-pan-kyc.com).',
      'The link opens a pixel-perfect replica of the bank\'s login screen.',
      'Prompts you to enter your NetBanking username, password, date of birth, and card CVV.',
      'Triggers an immediate net banking password reset, capturing the OTP sent to your phone to hijack the account.'
    ],
    redFlagChecklist: [
      'SMS sent from private 10-digit mobile numbers or unknown alpha headers.',
      'Threatening language: "Account will be permanently closed today".',
      'Forms asking for full card credentials, ATM PIN, or NetBanking password on a single page.'
    ],
    preventionSteps: [
      'Banks will never send links in SMS demanding credential input for KYC updates.',
      'Always access NetBanking by manually typing the bank address into your browser address bar.',
      'Check KYC status inside your mobile app or visit your home branch in person.'
    ],
    whatToDoIfVictim: [
      'Immediately change your NetBanking password and transaction password from a secure device.',
      'Call your bank\'s emergency helpline to disable NetBanking and block associated debit cards.',
      'File an incident report on cybercrime.gov.in.'
    ],
    officialHelplineNote: 'Use RBI Sachet portal (sachet.rbi.org.in) and 1930 to report fraudulent banking messages.'
  },
  {
    id: 'art-6',
    title: 'Pig Butchering & Fake Crypto / Stock Market Groups',
    category: 'Social',
    readTime: '6 min read',
    summary: 'Deep dive into long-term financial romance and investment grooming syndicates that drain millions through manipulated trading platforms.',
    realWorldImpact: 'Global losses from "Pig Butchering" (Sha Zhu Pan) schemes exceeded $75 Billion between 2020 and 2024, with specialized cybercrime hubs operating across Southeast Asia.',
    commonTactics: [
      'Initial contact via "wrong number" text on WhatsApp or high-profile matchmaking portals.',
      'Months of gentle rapport building, sharing everyday life, creating an illusion of financial success.',
      'Casual introduction to a "proprietary trading platform" or "institutional VIP stock tip channel".',
      'Victim deposits a modest initial sum ($500 or ₹25,000) and is allowed to withdraw a real profit of 20%.',
      'Encouraged to liquidate real estate, provident funds, or take bank loans to deposit large amounts.',
      'When attempting a large withdrawal, the platform freezes funds and demands 30% "capital gains tax" in advance.'
    ],
    redFlagChecklist: [
      'Unsolicited online contacts who steer conversations toward crypto, gold arbitrage, or stock tips.',
      'Trading platforms not registered with SEBI, SEC, or official financial regulators.',
      'Guaranteed profits with zero risk of loss.',
      'Demands to pay "withdrawal taxes" or "liquidity fees" via cryptocurrency or personal bank accounts.'
    ],
    preventionSteps: [
      'Never invest through unverified links or trading apps downloaded outside official app stores.',
      'Verify financial advisors on the SEBI registered intermediaries portal before transferring capital.',
      'Never send personal funds to online acquaintances you have never met face-to-face.'
    ],
    whatToDoIfVictim: [
      'Do not pay additional fees to "unlock" your balance — no funds will ever be returned.',
      'Gather all chat transcripts, deposit wallet addresses, and bank receipts.',
      'Report the syndicate to the cyber police via cybercrime.gov.in and international registries (IC3).'
    ],
    officialHelplineNote: 'File reports promptly with SEBI Complaints Redress System (SCORES) and Helpline 1930.'
  },
  {
    id: 'art-7',
    title: 'SIM Swap & Cellular Porting Account Takeover Attacks',
    category: 'Identity',
    readTime: '4 min read',
    summary: 'How attackers silence your mobile phone to seize your SMS two-factor authentication codes and drain connected bank accounts.',
    realWorldImpact: 'A successful SIM swap bypasses traditional SMS-based 2FA across banking, email, cryptocurrency, and social media in a matter of minutes.',
    commonTactics: [
      'Attacker gathers target\'s name, date of birth, and Aadhaar copy from data breaches or phishing.',
      'Visits a telecom retail shop with counterfeit ID pretending to have lost the phone, or sends fraudulent porting SMS (e.g. PORT <number>).',
      'The telecom operator issues a replacement SIM, immediately deactivating the victim\'s genuine SIM card.',
      'With cellular access, the attacker triggers "Forgot Password" on email and banking apps, receiving the SMS OTPs directly.',
      'Funds are liquidated before the victim discovers their network failure.'
    ],
    redFlagChecklist: [
      'Your phone suddenly displays "No Service" or "Emergency Calls Only" in an area with good coverage.',
      'Inability to make calls or send texts lasting more than 15 minutes without an ISP outage announcement.',
      'Receiving unexpected SMS notifications stating "SIM replacement requested" or "Porting PIN generated".'
    ],
    preventionSteps: [
      'If you receive an unsolicited SMS with a porting code, immediately contact your telecom operator.',
      'Set a SIM lock PIN on your phone\'s cellular settings.',
      'Transition your critical accounts (email, banking) from SMS OTP to hardware security keys (YubiKey) or authenticator apps (Google Authenticator).'
    ],
    whatToDoIfVictim: [
      'Borrow a phone immediately to call your telecom customer support and lock your mobile number.',
      'Contact your primary bank to freeze NetBanking and UPI transactions.',
      'Log into email accounts from a computer and revoke all active mobile sessions.'
    ],
    officialHelplineNote: 'Report unauthorized SIM swap incidents immediately to your telecom provider and 1930.'
  },
  {
    id: 'art-8',
    title: 'Protecting Parents & Older Adults from Cyber Frauds',
    category: 'Family Safety',
    readTime: '5 min read',
    summary: 'A compassionate, practical guide to shielding senior family members from high-pressure telephone intimidation and emotional blackmail.',
    realWorldImpact: 'Senior citizens suffer the highest average financial loss per incident among all demographics, frequently targeted by digital arrest threats and bogus medical emergency scams.',
    commonTactics: [
      'Intimidation by callers shouting and impersonating court officials or crime branch detectives.',
      'Fake family emergencies: "Your son has been detained in an accident, send ₹50,000 for emergency bail".',
      'Bogus pension and health insurance verification calls requiring biometric updates or card numbers.',
      'Remote desktop tools (AnyDesk, TeamViewer) framed as "Senior Tech Support Assistance".'
    ],
    redFlagChecklist: [
      'Calls that instruct seniors to leave their home or isolate themselves from adult children.',
      'Urgent requests for money sent under threats of physical arrest or harm to relatives.',
      'Anyone instructing a senior to visit an ATM or bank branch while keeping the phone call active.'
    ],
    preventionSteps: [
      'Establish a "Family Safe Word" to verify genuine emergencies before transferring money.',
      'Set conservative daily transaction limits on senior family members\' debit cards and UPI accounts.',
      'Install spam-blocking caller ID applications and enable strict call screening on their devices.',
      'Reassure seniors that legitimate authorities never settle police matters over WhatsApp calls.'
    ],
    whatToDoIfVictim: [
      'Offer emotional support without blaming the victim — scammers use sophisticated psychological manipulation.',
      'Accompany them to the police station or assist in calling 1930 to lodge an official complaint.',
      'Work with their bank to cancel compromised cards and establish fresh account credentials.'
    ],
    officialHelplineNote: 'National Elder Helpline: 14567. Cybercrime Helpline: 1930.'
  },
  {
    id: 'art-9',
    title: 'Mastering Passwords, Passkeys & Multi-Factor Authentication',
    category: 'Identity',
    readTime: '5 min read',
    summary: 'The modern playbook for locking down personal digital identities against credential stuffing, password spray, and session hijacking.',
    realWorldImpact: 'Over 80% of data breaches involve stolen, weak, or reused passwords. Upgrading to Passkeys eliminates traditional phishing vulnerability entirely.',
    commonTactics: [
      'Credential stuffing: Using passwords leaked from one breached website to break into your email and bank.',
      'Phishing reverse proxies (e.g. Evilginx) that intercept both your password and your temporary 6-digit OTP in real-time.',
      'Malicious browser extensions that steal saved session cookies from your active tabs.'
    ],
    redFlagChecklist: [
      'Reusing the same password across multiple online accounts.',
      'Using short passwords containing birthdays, pet names, or sequential digits.',
      'Relying solely on SMS OTP for two-factor authentication on your primary email.'
    ],
    preventionSteps: [
      'Use a reputable password manager (Bitwarden, 1Password, or Apple Keychain) with 16+ character unique passphrases.',
      'Enable FIDO2 Passkeys wherever available (Google, Apple, Microsoft, Amazon). Passkeys are cryptographically bound to the real domain and cannot be phished.',
      'Use Authenticator apps (Aegis, Google Authenticator) instead of SMS for 2FA.'
    ],
    whatToDoIfVictim: [
      'Immediately trigger "Log out of all devices" in your Google or Microsoft account security settings.',
      'Change your master password and revoke authorized app tokens.',
      'Review account recovery emails and phone numbers to ensure attackers have not added their own.'
    ],
    officialHelplineNote: 'Refer to CERT-In digital security guidelines at https://www.cert-in.org.in/'
  },
  {
    id: 'art-10',
    title: 'Electricity & Utility Disconnection Scams Exposed',
    category: 'Payments',
    readTime: '4 min read',
    summary: 'How scammers take advantage of evening panic with fake power cut warnings to steal money and install remote access Trojans.',
    realWorldImpact: 'State electricity boards across India (Tata Power, BESCOM, MSEDCL, UPPCL) have issued public red alerts after tens of thousands of consumers received fraudulent power cut SMS.',
    commonTactics: [
      'Bulk SMS dispatched between 5:00 PM and 8:00 PM stating electricity will be disconnected tonight at 9:30 PM.',
      'Directs the customer to call a 10-digit mobile number belonging to an "Electricity Officer".',
      'When called, the fraudster claims a previous bill was rejected by the server and demands a nominal ₹10 test payment.',
      'Directs the customer to download an app named "QuickSupport" or "AnyDesk" to assist with the payment.',
      'Once installed, the fraudster views the screen while the user logs into their banking app, recording PINs and draining accounts.'
    ],
    redFlagChecklist: [
      'Notice arrives in the evening threatening disconnection within hours.',
      'Personal 10-digit mobile number provided for bill settlement.',
      'Requests to download any remote desktop or screen sharing application.'
    ],
    preventionSteps: [
      'Power utilities NEVER disconnect electricity at night or demand payments to personal phone numbers.',
      'Pay utility bills only through official board websites or regulated payment apps (BBPS - Bharat BillPay).',
      'Never install applications when instructed by phone callers.'
    ],
    whatToDoIfVictim: [
      'If you installed AnyDesk or QuickSupport, immediately turn on Airplane Mode and uninstall the app.',
      'Call your bank to freeze all payment channels and cards.',
      'Report the telephone number and scam details on 1930 and sachet.rbi.org.in.'
    ],
    officialHelplineNote: 'Report electricity scam numbers to State Cyber Police and 1930.'
  }
];
