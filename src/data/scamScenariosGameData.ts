import { ScenarioTrainingItem } from '../types';

export const SCAM_SCENARIOS_GAME: ScenarioTrainingItem[] = [
  {
    id: 1,
    category: 'Fake Reward / Prize',
    title: 'Scenario 1: Unexpected Lottery & Cashback Reward',
    scenarioDescription: 'You receive a text notification claiming you have won a festival cash draw or scratch reward, even though you don\'t recall entering any contest.',
    senderContext: 'SMS from "BZ-WINNER" (+91 99881 22334)',
    mockMessageText: 'Dear customer, congratulations! Your mobile number was selected for the Diwali Grand Prize of ₹25,000 cash. To claim your reward into your account, click http://festive-cash-reward.top/claim and pay the nominal processing fee of ₹199 before 6 PM today.',
    options: [
      {
        id: 'A',
        text: 'Pay the ₹199 processing fee immediately because ₹199 is very small compared to winning ₹25,000.',
        isSafe: false,
        feedback: 'Unsafe Action! This is a classic "advance-fee" fraud. Once you pay the ₹199, you will never receive any prize money. Moreover, the fake portal will capture your payment card or UPI credentials.'
      },
      {
        id: 'B',
        text: 'Ignore the link, do not pay any fee, and report the message as fraudulent spam on your device.',
        isSafe: true,
        feedback: 'Safe & Correct! Legitimate lotteries and rewards never ask you to pay advance "processing fees" or "taxes" to receive winnings. Ignoring and reporting stops the fraud chain.'
      },
      {
        id: 'C',
        text: 'Click the link just to check if your name is really on the winners list, but do not make any payment.',
        isSafe: false,
        feedback: 'Unsafe Choice! Even clicking the link is dangerous: it can silently download malicious APKs, install tracking cookies, or confirm to the scammer that your phone number is active and responsive.'
      }
    ],
    correctOptionId: 'B',
    safetyTip: 'Remember the golden rule: If you did not buy a ticket or enter a verified contest, you cannot win a prize. Legitimate cash rewards NEVER require you to pay an advance fee.',
    realWorldDefense: 'Report suspicious lottery claims on the National Cybercrime Helpline 1930 and block the sender.'
  },
  {
    id: 2,
    category: 'Bank Phishing',
    title: 'Scenario 2: Urgent Bank Account Block Notice',
    scenarioDescription: 'During your workday, you get an alarming SMS stating your bank account has been deactivated due to non-updated PAN KYC, threatening permanent closure.',
    senderContext: 'SMS from "SBI-ALERT" (+91 87654 32109)',
    mockMessageText: 'URGENT: Your SBI Account 4821 is blocked today due to pending PAN Card verification. To unblock immediately and restore NetBanking access, click http://sbi.kyc-verification-net.xyz within 12 hours.',
    options: [
      {
        id: 'A',
        text: 'Click the link and fill out the form with your NetBanking password and PAN to quickly unblock your account.',
        isSafe: false,
        feedback: 'Highly Dangerous! The link leads to a phishing replica of the bank\'s website. Typing your credentials hands full control of your net banking directly to the criminals.'
      },
      {
        id: 'B',
        text: 'Reply to the SMS asking the bank manager to grant you an extension until the weekend.',
        isSafe: false,
        feedback: 'Unsafe & Ineffective! Replying confirms your phone number is monitored by an active user, leading to more aggressive phishing attacks and scam calls.'
      },
      {
        id: 'C',
        text: 'Do not click the link. Open your official YONO SBI mobile app independently or visit your local branch to check your KYC status.',
        isSafe: true,
        feedback: 'Safe & Correct! Banks never send third-party links (.xyz) demanding passwords. Checking directly through your official app or branch ensures your credentials stay secure.'
      }
    ],
    correctOptionId: 'C',
    safetyTip: 'Banks will never send links in SMS messages demanding password or KYC input under threat of immediate same-day account closure.',
    realWorldDefense: 'Verify bank communications exclusively via the official domain (e.g. onlinesbi.sbi or sbi.co.in) or your banking mobile app.'
  },
  {
    id: 3,
    category: 'Fake Work-From-Home',
    title: 'Scenario 3: High-Paying "YouTube Video Likes" Job',
    scenarioDescription: 'You receive a WhatsApp message offering ₹5,000 per day for 1 hour of remote work. They even sent you ₹150 for liking 3 sample videos to prove they are "real". Now they ask you to deposit ₹2,000 for a "VIP Prepaid Commission Task".',
    senderContext: 'WhatsApp message from "Recruiter Sneha" (+91 70123 45678)',
    mockMessageText: 'You have done amazing work on the trial! Now to unlock your VIP Level 1 task where you can earn ₹4,500 guaranteed, deposit ₹2,000 into our company crypto escrow account. You will get back ₹2,000 + ₹4,500 within 30 minutes!',
    options: [
      {
        id: 'A',
        text: 'Deposit the ₹2,000 because they already proved their honesty by paying you ₹150 earlier.',
        isSafe: false,
        feedback: 'Critical Trap! The ₹150 was bait. Once you deposit ₹2,000, they will show fake earnings in an un-withdrawable web portal and demand ₹10,000, then ₹50,000 to "unlock" your balance.'
      },
      {
        id: 'B',
        text: 'Refuse to deposit any money, exit and block the group, and keep the ₹150 without engaging further.',
        isSafe: true,
        feedback: 'Safe & Correct! Never pay money to work. Legitimate jobs pay you; they NEVER ask employees or freelancers to deposit prepaid recharge funds.'
      },
      {
        id: 'C',
        text: 'Negotiate to deposit only ₹500 first to test if they really return the commission.',
        isSafe: false,
        feedback: 'Unsafe! Any money sent to task scammers is lost immediately. Negotiating keeps you in their social engineering funnel.'
      }
    ],
    correctOptionId: 'B',
    safetyTip: 'No real company in the world pays thousands daily for liking videos. Any job asking for a "security deposit" or "recharge fee" is 100% a task scam.',
    realWorldDefense: 'Report fake recruitment Telegram and WhatsApp channels to the National Cybercrime Portal.'
  },
  {
    id: 4,
    category: 'Parcel Delivery Fee',
    title: 'Scenario 4: Fake Courier Address Fee',
    scenarioDescription: 'You get an SMS claiming a courier package cannot be delivered because your street address was incomplete. It asks for a nominal ₹20 redelivery fee.',
    senderContext: 'SMS from "VM-DELIV" (+91 91234 99887)',
    mockMessageText: 'BlueDart Courier: Package tracking #BD892019 is on hold at our local hub due to incomplete street address. Pay ₹20 address update fee and reschedule delivery at http://bluedart-tracking-reschedule.click within 24 hrs.',
    options: [
      {
        id: 'A',
        text: 'Click the link and pay the ₹20 with your debit card because you regularly order online and don\'t want delays.',
        isSafe: false,
        feedback: 'Dangerous! The ₹20 is a decoy. The fake webpage captures your 16-digit debit card number, expiry date, CVV, and OTP, enabling unauthorized international charges.'
      },
      {
        id: 'B',
        text: 'Do not click the link. Open your official shopping app (e.g. Amazon, Flipkart) to check the real delivery status of your recent orders.',
        isSafe: true,
        feedback: 'Safe & Correct! Legitimate couriers do not require online credit card payments via SMS links to deliver items. Checking your verified shopping order status reveals the truth.'
      },
      {
        id: 'C',
        text: 'Call the 10-digit phone number that sent the SMS and read your address and card details to the agent over the phone.',
        isSafe: false,
        feedback: 'Unsafe! The phone number belongs to the fraudster. Giving payment card details or addresses over the phone is hazardous.'
      }
    ],
    correctOptionId: 'B',
    safetyTip: 'Official courier companies never cancel orders or demand debit card CVVs over unverified link shorteners or .click/.xyz domains.',
    realWorldDefense: 'Always cross-reference tracking numbers on the courier\'s verified homepage (e.g. bluedart.com or indiapost.gov.in).'
  },
  {
    id: '5' as any,
    category: 'Friend / Family Impersonation',
    title: 'Scenario 5: Urgent "Friend in Emergency" WhatsApp Message',
    scenarioDescription: 'You receive a WhatsApp message from an unknown number displaying your close college friend\'s photo, claiming their phone fell in water and they desperately need ₹10,000 for hospital clinic fees.',
    senderContext: 'WhatsApp message (+91 88990 77665) with friend\'s photo',
    mockMessageText: 'Hey! My phone fell into water and was ruined. I am using a temporary number right now. I am stuck at an emergency clinic and need ₹10,000 right now for medicines. Please GPay to: clinic.emergency89@okaxis. I will return it tomorrow evening. Please don\'t call, doctor is right here!',
    options: [
      {
        id: 'A',
        text: 'Transfer the ₹10,000 immediately because you recognize their photo and they are in a medical emergency.',
        isSafe: false,
        feedback: 'High Risk! Anyone can download a profile picture from Instagram or WhatsApp. Scammers use fake emergencies to prevent you from taking time to verify.'
      },
      {
        id: 'B',
        text: 'Call your friend\'s known original phone number directly, or speak with mutual friends/family to verify before sending any money.',
        isSafe: true,
        feedback: 'Safe & Correct! Always verify out-of-band. Calling their known phone number or asking a question only your real friend knows exposes the imposter immediately.'
      },
      {
        id: 'C',
        text: 'Send half the money (₹5,000) just in case the emergency is real, so you minimize your risk.',
        isSafe: false,
        feedback: 'Unsafe Compromise! You are still sending money to a stranger. If it is a scammer, that ₹5,000 is gone forever.'
      }
    ],
    correctOptionId: 'B',
    safetyTip: 'Whenever someone claims an emergency and insists "Do not call", that is a classic red flag to prevent voice verification. Always verify through a trusted secondary channel.',
    realWorldDefense: 'Establish a family/friend "safe word" to verify genuine identity during emergency financial requests.'
  }
];
