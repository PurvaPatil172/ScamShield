import { Scenario } from '../types';

export const SCENARIOS_DATA: Scenario[] = [
  {
    id: 'scen-1',
    title: 'Urgent India Post Address Update SMS',
    platform: 'SMS',
    sender: 'VM-INDPOST',
    senderHandle: '+91 91234 56789',
    timestamp: '10:42 AM',
    content: 'IndiaPost Notice: Package IP78921045 could not be dispatched due to invalid street address. Please update your delivery location at http://indiapost-update.xyz/track within 12 hrs or parcel will be returned to sender.',
    clues: [
      {
        textFragment: 'http://indiapost-update.xyz/track',
        description: 'Unofficial third-party domain (.xyz) instead of the genuine Indian government portal (indiapost.gov.in).'
      },
      {
        textFragment: 'within 12 hrs or parcel will be returned',
        description: 'Manufactured sense of urgency designed to panic the victim into acting without checking.'
      },
      {
        textFragment: '+91 91234 56789',
        description: 'Sent from an ordinary 10-digit mobile number rather than an official government SMS header (e.g. GOVIND, INDPST).'
      }
    ],
    correctVerdict: 'Suspicious / Scam',
    explanation: 'This is an impersonation phishing SMS designed to direct victims to a spoofed India Post portal where they are asked to pay a nominal "re-delivery fee" of ₹5 or ₹10, harvesting their full credit card credentials and CVV.',
    bestNextStep: 'Do NOT click the link. If you are expecting a parcel, open a new browser tab and check the tracking number at indiapost.gov.in directly.'
  },
  {
    id: 'scen-2',
    title: 'HDFC Bank Security Alert: Monthly Statement Available',
    platform: 'Email',
    sender: 'HDFC Bank NetBanking',
    senderHandle: 'alerts@hdfcbank.net',
    subject: 'Your HDFC Bank Account Statement for October 2026',
    timestamp: 'Yesterday at 3:15 PM',
    content: 'Dear Valued Customer,\n\nYour monthly consolidated account statement for the period ending 25th October 2026 is now ready.\n\nYou may view your statement securely by logging in to your NetBanking account at https://netbanking.hdfcbank.com or via the HDFC Bank MobileBanking App.\n\nPlease note: HDFC Bank will never ask for your confidential NetBanking Password, UPI PIN, or OTP via email or SMS.\n\nWarm regards,\nHDFC Bank Customer Support',
    attachmentName: 'Statement_Oct2026.pdf (Password Protected)',
    clues: [
      {
        textFragment: 'https://netbanking.hdfcbank.com',
        description: 'Points to the verified, authentic official domain (hdfcbank.com) over secure HTTPS.'
      },
      {
        textFragment: 'HDFC Bank will never ask for your confidential NetBanking Password, UPI PIN, or OTP',
        description: 'Includes a clear proactive security reminder rather than demanding confidential credentials.'
      },
      {
        textFragment: 'alerts@hdfcbank.net',
        description: 'Sent from an official domain registered to HDFC Bank for transactional notifications.'
      }
    ],
    correctVerdict: 'Legitimate / Safe',
    explanation: 'This is a genuine transactional communication. It does not solicit urgent action, does not demand personal passwords, and points to the authentic bank domain with standard security reminders.',
    bestNextStep: 'Safe to read. To be extra cautious, always open the MobileBanking app directly on your phone instead of clicking email links.'
  },
  {
    id: 'scen-3',
    title: 'CBI / Narcotics Bureau "Digital Arrest" Video Call Notice',
    platform: 'WhatsApp',
    sender: 'Inspector Rajesh Verma (Crime Branch)',
    senderHandle: '+91 98765 43210 (Has CBI Logo as DP)',
    timestamp: 'Today at 8:15 AM',
    content: 'ATTENTION: You are named in FIR No. 2026/894 registered at Cyber Crime Cell, New Delhi regarding money laundering of ₹3.4 Crores and illegal package containing narcotics intercepted at Mumbai International Airport.\n\nYou are placed under DIGITAL ARREST. Remain on standby for mandatory video interrogation. Do not leave your room or contact family. Failure to comply will lead to immediate physical arrest by local police.\n\nConnect immediately: https://cbi-investigation-portal.site/case-view',
    clues: [
      {
        textFragment: 'placed under DIGITAL ARREST',
        description: 'Indian law has NO legal provision called "Digital Arrest". The concept is entirely fabricated by criminal extortion rings.'
      },
      {
        textFragment: 'Do not leave your room or contact family',
        description: 'Psychological isolation tactic aimed at preventing the victim from consulting friends, lawyers, or local police.'
      },
      {
        textFragment: 'https://cbi-investigation-portal.site/case-view',
        description: 'Fake domain (.site) mimicking law enforcement; authentic CBI documents are never served through WhatsApp links.'
      }
    ],
    correctVerdict: 'Suspicious / Scam',
    explanation: 'This is the severe "Digital Arrest" extortion scam that has defrauded thousands across India. Criminals pose as CBI, ED, or Mumbai Police on video calls, displaying fake uniforms, arrest warrants, and Supreme Court letterheads to force victims to transfer their savings to "clearance accounts".',
    bestNextStep: 'Immediately block and report the number. Disconnect any video call. Call National Cyber Crime Helpline 1930 and file a report at cybercrime.gov.in.'
  },
  {
    id: 'scen-4',
    title: 'Remote Data Analyst Job Offer on LinkedIn',
    platform: 'LinkedIn',
    sender: 'Sarah Jenkins (Talent Acquisition Specialist)',
    senderHandle: 'in/sarah-talent-recruiter-9281',
    subject: 'Direct Job Offer: Remote Data Analyst ($6,500/month)',
    timestamp: '2 days ago',
    content: 'Hello! I reviewed your profile and our executive board was highly impressed. We are offering you the position of Senior Remote Data Analyst with an annual package of ₹55 Lakhs.\n\nNo formal interview is required as your experience speaks for itself. To finalize your onboarding and receive your Apple MacBook Pro, please transfer ₹4,200 for mandatory courier insurance and verification kit to our accounting coordinator via UPI: hr.onboarding@icici.\n\nPlease send payment screenshot to confirm.',
    clues: [
      {
        textFragment: 'No formal interview is required',
        description: 'No genuine company hires high-paying corporate candidates without multiple technical and behavioural interviews.'
      },
      {
        textFragment: 'transfer ₹4,200 for mandatory courier insurance and verification kit',
        description: 'Legitimate employers NEVER ask candidates to pay for background checks, laptops, onboarding kits, or courier fees.'
      },
      {
        textFragment: 'UPI: hr.onboarding@icici',
        description: 'Directs payment to a personal UPI handle rather than an official corporate escrow or company portal.'
      }
    ],
    correctVerdict: 'Suspicious / Scam',
    explanation: 'Classic advance-fee recruitment fraud. The high salary and free equipment are bait to extract the onboarding fee. Once paid, the fraudster demands further fees or disappears entirely.',
    bestNextStep: 'Block the profile on LinkedIn and report the message for recruitment fraud. Never pay money to secure a job.'
  },
  {
    id: 'scen-5',
    title: 'Electricity Power Cut Notice at 9:30 PM Tonight',
    platform: 'SMS',
    sender: 'BZ-POWERCUT',
    senderHandle: '+91 88776 65544',
    timestamp: '6:30 PM',
    content: 'Dear Consumer, Your electricity power will be disconnected tonight at 9:30 PM from the power station because your previous month bill was not updated. Please immediately contact our Electricity Officer Mr. Sharma at 9876543210 to update your bill and prevent power cut.',
    clues: [
      {
        textFragment: 'electricity power will be disconnected tonight at 9:30 PM',
        description: 'Utility companies are legally prohibited from cutting residential electricity at night without prior written notice and statutory grace periods.'
      },
      {
        textFragment: 'contact our Electricity Officer Mr. Sharma at 9876543210',
        description: 'Provides a private personal mobile phone number rather than an official toll-free customer helpline or consumer portal.'
      },
      {
        textFragment: '+91 88776 65544',
        description: 'Sent from an unregistered personal SIM card rather than an official state DISCOM bulk sender ID.'
      }
    ],
    correctVerdict: 'Suspicious / Scam',
    explanation: 'A rampant electricity bill scam. When the victim panics and calls the number, the scammer instructs them to download a remote screen-sharing app (AnyDesk) or pay a nominal ₹10 fee through a phishing portal, emptying their bank account.',
    bestNextStep: 'Do NOT call the mobile number. Check your latest electricity bill status on your state electricity board\'s official app or consumer portal.'
  },
  {
    id: 'scen-6',
    title: 'GitHub Security Alert: Personal Access Token Expiring',
    platform: 'Email',
    sender: 'GitHub Security',
    senderHandle: 'notifications@github.com',
    subject: '[GitHub] Your personal access token "prod-deploy" will expire in 7 days',
    timestamp: 'Yesterday at 11:20 AM',
    content: 'Hi developer,\n\nYour personal access token "prod-deploy" is scheduled to expire on 4th November 2026.\n\nIf you still need this token, you can regenerate it from your account settings at:\nhttps://github.com/settings/tokens\n\nIf you no longer need it, no action is required.\n\nThanks,\nThe GitHub Team',
    clues: [
      {
        textFragment: 'notifications@github.com',
        description: 'Sent from the legitimate official domain of GitHub (github.com).'
      },
      {
        textFragment: 'https://github.com/settings/tokens',
        description: 'Direct link to authentic GitHub settings; no misleading subdomains or third-party redirection.'
      },
      {
        textFragment: 'If you no longer need it, no action is required',
        description: 'No pressure, threats of account deletion, or urgent demands for passwords.'
      }
    ],
    correctVerdict: 'Legitimate / Safe',
    explanation: 'This is a genuine automated developer notification from GitHub alerting you to standard security hygiene (token expiration). It directs you to the standard settings page without requesting credentials.',
    bestNextStep: 'Legitimate notice. You can log in to your GitHub account independently and review your active developer tokens.'
  },
  {
    id: 'scen-7',
    title: 'Friend Asking for Urgent ₹15,000 on WhatsApp with New Number',
    platform: 'WhatsApp',
    sender: 'Rohan (Friend)',
    senderHandle: '+91 70012 34567 (Profile picture matches your friend Rohan)',
    timestamp: 'Today at 2:10 PM',
    content: 'Bro! Urgent help needed. My phone was stolen on the metro and I am using my roommate\'s phone right now. I have to pay my medical clinic bill of ₹15,000 right now or they won\'t discharge me. Please send ₹15,000 to this UPI: rohan.clinic89@okaxis. I will return it by tomorrow evening once my new SIM is active. Please don\'t call, the doctor is standing right next to me!',
    clues: [
      {
        textFragment: 'Please don\'t call, the doctor is standing right next to me',
        description: 'Strong resistance to voice communication, a hallmark of impersonation fraud to prevent voice recognition.'
      },
      {
        textFragment: 'My phone was stolen ... using roommate\'s phone',
        description: 'Convenient explanation for reaching out from an unknown phone number.'
      },
      {
        textFragment: 'rohan.clinic89@okaxis',
        description: 'Unverified UPI handle set up to mimic your friend\'s name.'
      }
    ],
    correctVerdict: 'Suspicious / Scam',
    explanation: 'Social media friend impersonation. Attackers scrape profile pictures and friend lists from Instagram or Facebook, then message contacts with concocted medical or travel emergencies, demanding fast transfers before the victim can verify.',
    bestNextStep: 'Do NOT send funds. Place a direct phone call to your friend\'s known original number, contact their family members, or ask a question only your real friend would know.'
  },
  {
    id: 'scen-8',
    title: 'Google Drive File Shared by an Unknown Email',
    platform: 'Email',
    sender: 'Google Drive Notification',
    senderHandle: 'drive-shares-noreply@google.com',
    subject: 'Alex shared an item with you: "Payment_Voucher_Q3.pdf.exe"',
    timestamp: '3 hours ago',
    content: 'Google Drive Notification:\n\nuser_x9281@consultant-group.ru shared an item with you:\n\n"Payment_Voucher_Q3.pdf.exe"\n\nMessage from sender:\n"Kindly review the attached settlement voucher before release."\n\nOpen in Google Drive: https://drive.google.com/open?id=18928374',
    attachmentName: 'Payment_Voucher_Q3.pdf.exe',
    clues: [
      {
        textFragment: 'Payment_Voucher_Q3.pdf.exe',
        description: 'Double extension trick! The file claims to be a PDF, but the final extension is ".exe" (an executable Windows application containing malware).'
      },
      {
        textFragment: 'user_x9281@consultant-group.ru',
        description: 'Unknown sender using a high-risk foreign domain with no prior business relationship.'
      },
      {
        textFragment: 'drive-shares-noreply@google.com',
        description: 'Scammers abuse genuine Google Drive notification systems by sharing malicious files to bypass spam filters.'
      }
    ],
    correctVerdict: 'Suspicious / Scam',
    explanation: 'Scammers frequently abuse legitimate cloud services (Google Drive, Dropbox, OneDrive) to distribute malware. The double extension ".pdf.exe" indicates Trojan software that infects your computer if opened.',
    bestNextStep: 'Do NOT open or download the file. Block the sharing user on Google Drive and report the shared file as malicious.'
  }
];
