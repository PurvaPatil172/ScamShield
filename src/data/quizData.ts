import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Banking',
    difficulty: 'Beginner',
    scenario: 'You receive an urgent SMS: "Dear Customer, your SBI account 4821 is blocked due to incomplete PAN KYC. Click http://sbi.kyc-verify-net.xyz within 12 hours to avoid permanent deactivation."',
    question: 'What is the safest action to take?',
    options: [
      'Click the link immediately and update your PAN card details to keep your account active.',
      'Ignore the link, open your official YONO SBI app or visit your local branch to verify your account status.',
      'Reply to the SMS asking for more time to submit documents.',
      'Forward the message to family members to ask if their accounts were also blocked.'
    ],
    correctIndex: 1,
    explanation: 'Banks never send links ending in unverified third-party domains (.xyz) demanding immediate KYC updates under threat of deactivation within hours. Legitimate updates can be checked securely inside your official banking app or branch.',
    redFlags: [
      'Unusual domain (.xyz instead of official onlinesbi.sbi or sbi.co.in)',
      'Artificial urgency ("within 12 hours")',
      'Threat of immediate deactivation'
    ],
    safeAction: 'Never click the link. Log in directly via your official banking app or branch.'
  },
  {
    id: 2,
    category: 'UPI & Payments',
    difficulty: 'Beginner',
    scenario: 'You listed an old sofa on an online classifieds site. A buyer contacts you saying, "I have sent a QR code. Please scan it and enter your UPI PIN to receive the advance payment of ₹5,000."',
    question: 'What happens if you scan the QR code and enter your UPI PIN?',
    options: [
      '₹5,000 will be instantly credited to your bank account.',
      'Your account will be verified for future merchant transactions.',
      '₹5,000 will be debited (deducted) from YOUR bank account.',
      'Nothing happens; UPI PIN is only for security logging.'
    ],
    correctIndex: 2,
    explanation: 'A UPI PIN is ONLY entered when DEBITING (sending) money from your account. You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money.',
    redFlags: [
      'Requesting to scan QR code to receive money',
      'Asking for UPI PIN during a credit transaction',
      'Over-eager buyer not inspecting the goods in person'
    ],
    safeAction: 'Decline immediately. Instruct the buyer to pay directly via your registered UPI ID or cash upon inspection.'
  },
  {
    id: 3,
    category: 'Social Engineering',
    difficulty: 'Intermediate',
    scenario: 'A person wearing a police uniform video calls you on WhatsApp, showing a fake badge and a letterhead from "CBI Headquarters". They claim a parcel registered in your name was intercepted with illegal substances and place you under "Digital Arrest".',
    question: 'Is "Digital Arrest" a real legal procedure in India?',
    options: [
      'Yes, it is a new expedited procedure launched by the Ministry of Home Affairs.',
      'No, Indian law enforcement agencies NEVER arrest citizens via video calls or demand secret bail funds.',
      'Yes, but only if conducted between 9 AM and 6 PM.',
      'Yes, if they show an official CBI or Police ID card on camera.'
    ],
    correctIndex: 1,
    explanation: 'The Ministry of Home Affairs (MHA) and CBI have repeatedly confirmed that there is NO provision for "Digital Arrest" under Indian law. Police, ED, or CBI will never demand money, nor will they interrogate or detain you over WhatsApp/Skype video calls.',
    redFlags: [
      'Video call from purported police/CBI officer',
      'Use of terms like "Digital Arrest" or "Confidential Investigation"',
      'Demanding immediate funds transfer for "case verification" or "clearance"'
    ],
    safeAction: 'Disconnect the call immediately. Block the number. Dial 1930 or file a report at cybercrime.gov.in.'
  },
  {
    id: 4,
    category: 'Fake Jobs',
    difficulty: 'Beginner',
    scenario: 'You receive a WhatsApp message from "HR at Global Media": "Earn ₹3,000 to ₹8,000 daily by liking YouTube videos and Google reviews. Work 1 hour per day from home. Join our Telegram group to start."',
    question: 'How does this task scam typically unfold?',
    options: [
      'They will employ you on a legitimate marketing contract after a brief test.',
      'They pay a tiny token amount (₹150) for the first 3 likes, then demand "prepaid VIP recharge deposits" of ₹5,000 to ₹50,000 which you can never withdraw.',
      'Google automatically deposits ad revenue into your account.',
      'They will train you in professional video production for free.'
    ],
    correctIndex: 1,
    explanation: 'This is the infamous "Task / YouTube Like Scam". Scammers pay a small token first to gain trust, then trick victims into joining Telegram groups where they must deposit large sums in fake "crypto/VIP tasks" before locking all funds.',
    redFlags: [
      'Unsolicited job offer via messaging app',
      'Absurdly high pay for effortless tasks (liking videos)',
      'Migration to an anonymous Telegram channel'
    ],
    safeAction: 'Block the sender immediately and report the conversation as spam.'
  },
  {
    id: 5,
    category: 'Delivery Scams',
    difficulty: 'Intermediate',
    scenario: 'You receive an SMS: "India Post: Your package IND892019 could not be delivered due to an incorrect house number. Please update your address within 24 hours at http://indiapost-parcel-reschedule.click or it will be returned."',
    question: 'Which of the following points indicates this is a phishing attempt?',
    options: [
      'India Post does not use SMS for delivery updates.',
      'The link uses the domain ".click" rather than the official government domain "indiapost.gov.in".',
      'The package tracking number contains only 9 characters.',
      'India Post never returns undelivered items.'
    ],
    correctIndex: 1,
    explanation: 'All official Indian government portals strictly use the ".gov.in" or ".nic.in" domain hierarchy. Unofficial domains like ".click", ".top", or ".xyz" are hosted on private servers by fraudsters to harvest credit card numbers for "re-delivery fees".',
    redFlags: [
      'Fake domain suffix (.click instead of .gov.in)',
      'Artificial deadline before return',
      'Asking to pay a small "address update fee"'
    ],
    safeAction: 'Open your browser and visit indiapost.gov.in directly to enter your tracking number.'
  },
  {
    id: 6,
    category: 'Phishing',
    difficulty: 'Intermediate',
    scenario: 'You receive an email appearing to be from Netflix with the subject: "Billing Alert: Update your payment method". The sender shows "Netflix Support <support@netfl1x-billing-update.com>".',
    question: 'What is the subtle red flag in the sender address?',
    options: [
      'The word "Support" is capitalized.',
      'The domain uses the number "1" instead of the letter "l" in netfl1x.',
      'Emails cannot contain hyphens in their domain name.',
      'Billing emails must always be signed by the CEO.'
    ],
    correctIndex: 1,
    explanation: 'This is typosquatting: replacing the letter "l" with the numeral "1" ("netfl1x"). Visual similarities trick busy recipients into believing the email came from the authentic company.',
    redFlags: [
      'Character replacement (1 for l)',
      'Domain is not netflix.com',
      'Urgent payment threat'
    ],
    safeAction: 'Delete the email. If concerned about your subscription, log in independently at netflix.com.'
  },
  {
    id: 7,
    category: 'Banking',
    difficulty: 'Advanced',
    scenario: 'You receive a call from someone claiming to be your bank\'s fraud detection team. They recite your correct name, phone number, and the last 4 digits of your debit card, then say: "We prevented an unauthorized ₹25,000 transaction. To cancel it, read out the 6-digit OTP sent to your phone."',
    question: 'Why does the caller already know your name and last 4 card digits, and should you share the OTP?',
    options: [
      'They are legitimate bank employees, so you should read the OTP to cancel the fraudulent transaction.',
      'They obtained public or leaked merchant data; NEVER share the OTP, as reading it will APPROVE the fraudulent transaction.',
      'They are from the government audit bureau and need the OTP for tax clearance.',
      'You should read only the first 3 digits of the OTP to be partially safe.'
    ],
    correctIndex: 1,
    explanation: 'Scammers frequently purchase leaked merchant data (names, phone numbers, partial card numbers). They initiate the transaction themselves, and the OTP sent to your phone is what authorises the theft. Reading it approves the fraud!',
    redFlags: [
      'Caller asking for an OTP over the phone',
      'Using fear of existing fraud to manufacture panic',
      'Claiming an OTP is needed to "cancel" a transaction'
    ],
    safeAction: 'Hang up immediately. Call your bank using the phone number printed on the back of your physical card.'
  },
  {
    id: 8,
    category: 'Social Engineering',
    difficulty: 'Beginner',
    scenario: 'A WhatsApp message arrives from an unknown number with your close friend\'s photo: "Hi! My phone fell into water and I lost my contacts. This is my temporary number. I am stuck at an emergency clinic and need ₹10,000 urgently via GPay. Can you send it here?"',
    question: 'What should you do before transferring any money?',
    options: [
      'Send ₹5,000 first just in case they really need it.',
      'Call your friend on their regular, known phone number or speak with family members to verify.',
      'Ask the sender to take a selfie holding a spoon.',
      'Send the money immediately since their profile picture is authentic.'
    ],
    correctIndex: 1,
    explanation: 'Profile photos can be easily downloaded from social media and used on new WhatsApp numbers. Always call your friend directly on their known phone line before sending funds during purported "emergencies".',
    redFlags: [
      'Unknown number claiming to be a friend with a new device',
      'High emotional urgency requiring rapid money transfer',
      'Reluctance to have a voice conversation'
    ],
    safeAction: 'Call your friend on their original number or reach out to mutual acquaintances.'
  },
  {
    id: 9,
    category: 'Delivery Scams',
    difficulty: 'Advanced',
    scenario: 'You receive a text claiming your electricity will be disconnected tonight at 9:30 PM due to an unpaid previous month bill, directing you to call a specific mobile number (e.g., +91 98XXXXXX).',
    question: 'Why do utility companies not operate in this manner?',
    options: [
      'Utility providers send official physical disconnection notices weeks in advance and provide payment gateways on their official registered consumer portal, never personal mobile numbers.',
      'Utility companies only disconnect power at 8:00 AM.',
      'Electricity bills in India cannot be paid digitally.',
      'Electricity boards always send WhatsApp audio notes instead.'
    ],
    correctIndex: 0,
    explanation: 'Electricity distribution companies (DISCOMs) follow strict statutory notice periods and never provide personal 10-digit mobile numbers for immediate settlements under threat of same-night disconnection.',
    redFlags: [
      'Personal 10-digit mobile number provided for payment',
      'Extreme same-day deadline ("tonight at 9:30 PM")',
      'Lack of consumer account number or meter identifier'
    ],
    safeAction: 'Log into your official electricity board portal or app to verify bill status independently.'
  },
  {
    id: 10,
    category: 'UPI & Payments',
    difficulty: 'Intermediate',
    scenario: 'You mistakenly receive ₹2,000 on PhonePe/GPay from an unknown person. Moments later, they call crying, saying: "I accidentally sent money to your number intended for my mother\'s medicine. Please send it back immediately to this other UPI ID."',
    question: 'What is the risk of immediately transferring funds to the alternative UPI ID?',
    options: [
      'You will be charged a penalty tax by the Reserve Bank of India.',
      'This could be part of an unauthorized transaction or cyber fraud trail where your account is used as a mule, or they file a chargeback on the original payment leaving you double-debited.',
      'The money is counterfeit digital cash.',
      'PhonePe automatically deducts 50% commission.'
    ],
    correctIndex: 1,
    explanation: 'Scammers send stolen money to random accounts, then ask for a refund to a DIFFERENT account. When the original victim files a police complaint, YOUR account gets frozen as a recipient of stolen funds. Furthermore, the scammer can raise a bank chargeback on the initial payment.',
    redFlags: [
      'Unexpected incoming transfer followed by urgent call',
      'Requesting refund to a DIFFERENT UPI ID or number',
      'High emotional pressure'
    ],
    safeAction: 'Instruct the caller to raise a dispute through their bank or payment app. Do not transfer funds to third-party accounts; consult your bank manager.'
  },
  {
    id: 11,
    category: 'Phishing',
    difficulty: 'Beginner',
    scenario: 'You receive an email offering an Apple iPhone 16 Pro for ₹9,999 in a "Flash Mystery Clearance". The link leads to a page asking for your credit card details and CVV.',
    question: 'What rule of thumb best protects you here?',
    options: [
      'If an offer seems too good to be true, it is almost certainly a scam.',
      'Check if the webpage has a green lock icon; if it does, the deal is guaranteed genuine.',
      'Buy 3 iPhones to get bulk shipping discount.',
      'Provide your credit card details since banks will refund any loss anyway.'
    ],
    correctIndex: 0,
    explanation: 'Drastically discounted flagship electronics are classic phishing lures designed to steal payment card credentials or take money for items that will never ship. A green lock/HTTPS only encrypts the connection; it does not prove the merchant is trustworthy.',
    redFlags: [
      'Unrealistic 80-90% discount on newly launched devices',
      'Pressure timer counting down',
      'Unknown seller with no physical business address'
    ],
    safeAction: 'Shop exclusively through official verified retailers and authorized brand outlets.'
  },
  {
    id: 12,
    category: 'Fake Jobs',
    difficulty: 'Advanced',
    scenario: 'A recruiter on LinkedIn offers you a remote software position paying ₹25 Lakhs per annum without any technical interview, but insists you must first pay ₹3,500 for a "Mandatory Background Verification Kit" through their portal.',
    question: 'Is it customary for legitimate employers to charge candidates for onboarding or verification?',
    options: [
      'Yes, background checks are always paid by the prospective candidate.',
      'No, legitimate companies cover all hiring and background check expenses. Any fee required to secure a job is a scam.',
      'Only IT companies charge background fees.',
      'Yes, but the fee must be paid in cryptocurrency.'
    ],
    correctIndex: 1,
    explanation: 'No reputable employer will EVER charge candidates money for interviews, aptitude tests, equipment kits, or background verification. Any demand for payment as a condition of employment is fraudulent.',
    redFlags: [
      'Offer made without rigorous technical interviews',
      'Requirement to pay money for onboarding/verification',
      'Free webmail email addresses (e.g., hr-google@gmail.com)'
    ],
    safeAction: 'Never pay any recruitment fee. Verify the opening on the employer\'s official careers portal.'
  },
  {
    id: 13,
    category: 'Social Engineering',
    difficulty: 'Intermediate',
    scenario: 'You are downloading a movie or game mod, and a pop-up appears: "CRITICAL ALERT! Your Windows system has 5 Trojan viruses. Call Microsoft Support immediately at 1800-XXX-XXXX to prevent hard drive destruction."',
    question: 'What type of attack is this?',
    options: [
      'A real Windows Defender remote alert.',
      'A Tech Support Scareware Scam designed to trick you into granting remote access to your computer.',
      'A mandatory hardware update from Intel.',
      'An ISP network diagnostic notification.'
    ],
    correctIndex: 1,
    explanation: 'This is browser scareware. Legitimate operating systems and antivirus software do NOT include phone numbers for you to call in pop-up dialogs. If you call, fraudsters will ask to install remote access tools (AnyDesk, TeamViewer) to steal credentials.',
    redFlags: [
      'Browser pop-up with loud siren or artificial lock',
      'Prompting to call a phone number for tech support',
      'Exaggerated claims of immediate computer destruction'
    ],
    safeAction: 'Close the browser tab or task. Never call phone numbers displayed in browser pop-ups.'
  },
  {
    id: 14,
    category: 'Banking',
    difficulty: 'Advanced',
    scenario: 'You lose cell phone signal on your smartphone unexpectedly for several hours, while people tell you your WhatsApp or Telegram is showing new login activity.',
    question: 'What serious cybersecurity attack might be occurring?',
    options: [
      'Normal network tower maintenance.',
      'A SIM Swap / SIM Cloning attack where the attacker ported your phone number to their own SIM card to intercept OTPs.',
      'Your phone battery is depleted.',
      'Your phone was updated to 5G automatically.'
    ],
    correctIndex: 1,
    explanation: 'In a SIM swap scam, attackers use forged ID documents to convince your telecom provider to issue a replacement SIM card. Once active, your SIM goes dead, and the attacker receives all your two-factor authentication (2FA) SMS OTPs.',
    redFlags: [
      'Sudden loss of cellular network while others in the area have signal',
      'Unauthorized security notifications on social accounts',
      'Calls failing to connect'
    ],
    safeAction: 'Immediately contact your telecom carrier from another phone to report unauthorized SIM replacement, and notify your bank to freeze netbanking.'
  },
  {
    id: 15,
    category: 'Social Engineering',
    difficulty: 'Intermediate',
    scenario: 'An elderly relative is approached on social media by someone claiming to be a high-ranking foreign military doctor or diplomat who professes deep affection and claims to have sent a gift box containing jewellery and gold bars that is now "stuck at customs".',
    question: 'What classic scam pattern is this?',
    options: [
      'A genuine international diplomatic gift.',
      'Romance / Parcel Delivery Scam (Pig Butchering variant) where fake customs agents will demand successive fees for clearance.',
      'An international trade agreement.',
      'A lottery prize distribution.'
    ],
    correctIndex: 1,
    explanation: 'Romance scams exploit emotional vulnerability. The scammer promises extravagant gifts or a future visit, followed by fake calls from "customs officers" demanding clearance fees or anti-terror certificates, draining victims of life savings.',
    redFlags: [
      'Online acquaintance professing love quickly without meeting',
      'Claim of sending expensive parcel of gold, cash, or jewellery',
      'Demands for money to pay "customs penalties" or "clearance fees"'
    ],
    safeAction: 'Intervene compassionately. Cease all communications, do not send money, and report the account.'
  },
  {
    id: 16,
    category: 'Phishing',
    difficulty: 'Beginner',
    scenario: 'You get an SMS: "Free 50GB 5G data from Prime Minister Free Internet Scheme for all citizens! Claim now before midnight at http://pm-free-5g-data.free-portal.top".',
    question: 'What is the primary indicator that this is a phishing scam?',
    options: [
      'The government never offers 5G data.',
      'Official government initiatives are hosted strictly on .gov.in domains, not third-party free domains like .top.',
      '5G data cannot be transferred digitally.',
      'The message was sent in English rather than Hindi.'
    ],
    correctIndex: 1,
    explanation: 'Fraudsters routinely create fake government schemes (free laptops, free data, student subsidies) to harvest mobile numbers, install malware APKs, or lure users into sharing malicious links with contacts.',
    redFlags: [
      'Non-government domain suffix (.top)',
      'Offers of free high-value goods/services without any eligibility criteria',
      'Urgent countdown ("before midnight")'
    ],
    safeAction: 'Do not click the link or forward to groups. Check official government announcements at pib.gov.in.'
  },
  {
    id: 17,
    category: 'UPI & Payments',
    difficulty: 'Advanced',
    scenario: 'You search Google for customer care of a popular airline to reschedule your flight, and call the top phone number listed in search results. The agent answers, sounds helpful, but instructs you to download an app named "AnyDesk" or "RustDesk" to process your ₹250 refund.',
    question: 'Why did the "customer care" agent ask you to download AnyDesk or RustDesk?',
    options: [
      'It is the airline\'s proprietary ticketing system.',
      'AnyDesk and RustDesk are remote screen-sharing tools; installing them lets the scammer see your screen, view your banking PINs, and take over your device.',
      'It enhances your Wi-Fi connection speed.',
      'It is required by the Directorate General of Civil Aviation (DGCA).'
    ],
    correctIndex: 1,
    explanation: 'Scammers buy search engine ads or tamper with Google Maps listings to post fake customer care numbers. When victims call, they trick them into downloading remote desktop apps (AnyDesk, TeamViewer, RustDesk) to capture netbanking screens and OTPs in real-time.',
    redFlags: [
      'Customer support phone number found via general Google search ad instead of official app',
      'Request to install remote desktop / screen sharing software',
      'Asking to perform small banking transactions while sharing screen'
    ],
    safeAction: 'Never install remote desktop software requested by incoming or unverified phone callers. Obtain contact numbers exclusively from the official airline app.'
  },
  {
    id: 18,
    category: 'Fake Jobs',
    difficulty: 'Intermediate',
    scenario: 'You are invited to a "Crypto Investment Club" where the administrator shares screenshots of daily 25% returns and fellow group members testify how they bought new cars with their profits.',
    question: 'Why do so many members in the group post glowing testimonials?',
    options: [
      'The investment strategy is genuinely revolutionary.',
      'Most other "members" in the group are shill accounts or bots controlled by the same scam syndicate to create artificial social proof (Pig Butchering tactic).',
      'They receive government incentives for investing in cryptocurrency.',
      'They are verified financial advisors certified by SEBI.'
    ],
    correctIndex: 1,
    explanation: 'In coordinated financial scams, syndicates run hundreds of fake accounts in Telegram and WhatsApp groups. These bots cheer each other on, fake deposit receipts, and create fear of missing out (FOMO) to trap innocent victims.',
    redFlags: [
      'Guaranteed returns of 20-30% daily/weekly',
      'Unsolicited addition to investment chat groups',
      'Uniform praise from members with identical speaking styles'
    ],
    safeAction: 'Exit and report the group. Consult only SEBI-registered investment advisors for financial decisions.'
  }
];
