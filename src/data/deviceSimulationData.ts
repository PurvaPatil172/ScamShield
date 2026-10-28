import { DeviceSimulationMessage } from '../types';

export const DEVICE_SIMULATION_MESSAGES: DeviceSimulationMessage[] = [
  {
    id: 'jiomart-reward',
    category: 'Reward / Cashback',
    senderName: 'JM-REWARDS',
    senderPhone: '+91 90123 45678',
    timestamp: '11:24 AM',
    avatarLetter: 'J',
    messageBody: 'Congratulations! You have received an exclusive ₹300 cashback reward on your recent JioMart order. Claim instantly to your bank account: http://jiomart-cashback-claim.xyz/redeem within 2 hours.',
    suspiciousHighlights: [
      {
        phrase: 'exclusive ₹300 cashback reward',
        reason: 'Unsolicited cash reward designed to trigger excitement and lower your caution.'
      },
      {
        phrase: 'http://jiomart-cashback-claim.xyz/redeem',
        reason: 'Unfamiliar and suspicious domain ending in ".xyz" instead of the official "jiomart.com".'
      },
      {
        phrase: 'within 2 hours',
        reason: 'Artificial urgency timer designed to rush you into clicking before you can think or verify.'
      }
    ],
    warningSigns: [
      'Fake domain (.xyz): Official JioMart rewards are credited directly into your app wallet or the original payment method, never on third-party .xyz links.',
      'Unsolicited reward: You did not enter a contest or scratch a card, yet received an unexpected cash claim link.',
      'Urgency tactic ("within 2 hours"): Scammers create short deadlines so you rush without checking the link domain.',
      'Direct bank claim bait: Legit retail rewards don\'t ask you to click external links to deposit cashback into a bank account.'
    ],
    safeAction: 'Do NOT click the link. Open your official JioMart app or visit jiomart.com independently to check your genuine order cashback or wallet balance. Block and report the sender number as spam.',
    educationalFeedback: 'E-commerce reward scams are common. Fraudulent links lead to fake login pages that harvest your phone number, UPI ID, or net banking credentials. Legit platforms always credit cashback internally.'
  },
  {
    id: 'bank-otp-phish',
    category: 'Bank OTP',
    senderName: 'SBI-ALERT',
    senderPhone: '+91 98765 43210',
    timestamp: '02:45 PM',
    avatarLetter: 'S',
    messageBody: 'Dear Customer, unauthorized transaction of ₹18,400 attempted on your card. To CANCEL this transaction, immediately share the 6-digit OTP 849201 with your bank security executive or call +91-9876543210.',
    suspiciousHighlights: [
      {
        phrase: 'To CANCEL this transaction',
        reason: 'Deceptive inversion: OTPs authorize transactions; an OTP is NEVER used to cancel one!'
      },
      {
        phrase: 'share the 6-digit OTP 849201',
        reason: 'Major red flag: Banks repeatedly state they will NEVER ask you to share your OTP with anyone.'
      },
      {
        phrase: 'call +91-9876543210',
        reason: 'Personal 10-digit mobile number provided rather than the bank\'s official toll-free customer helpline.'
      }
    ],
    warningSigns: [
      'Requesting an OTP: Sharing your OTP allows the scammer to complete the fraudulent payment, not stop it!',
      'Fear and panic trigger: Mentioning a large deduction (₹18,400) creates anxiety so you react impulsively.',
      'Personal phone number: Legitimate banks use verified 1800-toll-free numbers or official shortcodes, never ordinary personal mobile lines.',
      'False cancellation promise: Banks do not require you to read out OTPs to reverse charges.'
    ],
    safeAction: 'NEVER share your OTP with anyone. Immediately hang up or ignore the message. Call the official phone number printed on the back of your physical debit/credit card to check recent transactions.',
    educationalFeedback: 'The scammer initiated the payment themselves using leaked card data. The OTP sent to your phone is the final lock protecting your money. The moment you share it, the theft is approved!'
  },
  {
    id: 'parcel-fee-scam',
    category: 'Parcel Delivery Fee',
    senderName: 'IN-POST',
    senderPhone: '+91 91234 88776',
    timestamp: '09:12 AM',
    avatarLetter: 'P',
    messageBody: 'India Post: Your parcel ID IN982194 could not be delivered due to missing house number. Pay ₹25 redelivery fee and update address at http://indiapost-parcel-reschedule.click before 8 PM or parcel will be returned.',
    suspiciousHighlights: [
      {
        phrase: 'Pay ₹25 redelivery fee',
        reason: 'Nominal fee trap: ₹25 seems so low you don\'t hesitate, but entering card details steals your full card number and CVV.'
      },
      {
        phrase: 'http://indiapost-parcel-reschedule.click',
        reason: 'Unofficial domain (.click) disguised as India Post. Real government portals strictly use ".gov.in".'
      },
      {
        phrase: 'before 8 PM or parcel will be returned',
        reason: 'Pressure deadline forcing quick action without independent tracking verification.'
      }
    ],
    warningSigns: [
      'Unofficial domain (.click): India Post will ONLY ever use "indiapost.gov.in". Any domain ending in .click, .top, or .xyz is fake.',
      'Small nominal fee bait (₹25): The fraudster does not want the ₹25; they want your card number, expiration date, and CVV entered on the fake payment gateway.',
      'Generic tracking number: Sent to thousands of random people regardless of whether they ordered anything.',
      'Threat of returning parcel: Uses fear of losing a package to manipulate you into swift compliance.'
    ],
    safeAction: 'Do NOT click the link. If you are expecting a parcel, open your browser and manually visit the official tracking page at indiapost.gov.in using your authentic consignment number.',
    educationalFeedback: 'Parcel delivery scams exploit online shopping habits. Once you type your card details on the fraudulent site, automated bots charge high amounts or drain your account.'
  },
  {
    id: 'fake-job-offer',
    category: 'Fake Job Offer',
    senderName: 'HR-RECRUIT',
    senderPhone: '+91 88990 11223',
    timestamp: '04:18 PM',
    avatarLetter: 'H',
    messageBody: 'Part-time job offer! Earn ₹4,000 to ₹9,000 daily working from home just by liking YouTube videos and rating Google Maps. No prior experience needed. Payouts every evening via UPI. Join our Telegram: https://t.me/task_jobs_daily to start.',
    suspiciousHighlights: [
      {
        phrase: 'Earn ₹4,000 to ₹9,000 daily',
        reason: 'Unrealistic income claim: Nobody pays ₹9,000 daily for trivial tasks like clicking like buttons.'
      },
      {
        phrase: 'liking YouTube videos and rating Google Maps',
        reason: 'Classic task scam lure: Simple social media tasks designed to make you feel work is effortless.'
      },
      {
        phrase: 'Payouts every evening via UPI',
        reason: 'Promises fast, frictionless payments to hook you into their fake task platform.'
      },
      {
        phrase: 'https://t.me/task_jobs_daily',
        reason: 'Migration to anonymous Telegram channels where scammers operate beyond regulatory oversight.'
      }
    ],
    warningSigns: [
      'Too good to be true earnings: Offering up to ₹2.7 Lakhs/month for clicking YouTube likes is impossible economics.',
      'Unsolicited recruiter message: Legitimate companies do not recruit random strangers via unsolicited WhatsApp or SMS messages.',
      'Prepaid task trap: They will pay ₹150 first to build trust, then demand ₹5,000 to ₹50,000 in "VIP recharge deposits" before locking your money forever.',
      'Anonymous platform: Shifting communication to Telegram hides the scammer\'s identity and phone location.'
    ],
    safeAction: 'Do NOT join the Telegram channel. Block the sender and report the message as spam. Remember: any job requiring you to deposit money to earn commissions is a financial scam.',
    educationalFeedback: 'Task and work-from-home scams are one of the most widespread frauds today. Fraudsters use fake dashboards displaying fake high balances that you can never withdraw without paying endless "fees".'
  }
];
