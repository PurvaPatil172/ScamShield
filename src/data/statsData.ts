import { ScamStat } from '../types';

export const SCAM_STATISTICS: ScamStat[] = [
  {
    id: 'stat-1',
    statNumber: '7,000+',
    metricLabel: 'Daily Cybercrime Complaints Reported',
    year: '2024',
    description: 'The National Cyber Crime Reporting Portal (NCRP) under the Ministry of Home Affairs (I4C) recorded over 7,000 cybercrime complaints registered on average each day across India, an increase of over 113% compared to 2021-2022.',
    sourceName: 'Indian Cyber Crime Coordination Centre (I4C) / Ministry of Home Affairs',
    sourceUrl: 'https://cybercrime.gov.in/',
    region: 'India',
    keyTakeaway: 'Digital financial fraud constitutes nearly 85% of all registered cybercrime complaints in the country.'
  },
  {
    id: 'stat-2',
    statNumber: '₹1,205 Crore',
    metricLabel: 'Lost to "Digital Arrest" Fraud Alone',
    year: '2024 (Jan - Oct)',
    description: 'A special parliamentary advisory and I4C data revealed that over ₹1,205 Crore was defrauded from Indian citizens through video call "Digital Arrest" impersonation scams in the first 10 months of 2024.',
    sourceName: 'Ministry of Home Affairs (MHA) Official Parliamentary Briefing',
    sourceUrl: 'https://pib.gov.in/',
    region: 'India',
    keyTakeaway: 'Targeted demographic includes seniors, retired government officials, and corporate professionals pressured via WhatsApp video calls.'
  },
  {
    id: 'stat-3',
    statNumber: '36,075',
    metricLabel: 'Bank Fraud Incidents Reported to RBI',
    year: '2023 - 2024',
    description: 'The Reserve Bank of India (RBI) Annual Report documented 36,075 fraud cases reported by scheduled commercial banks involving ₹13,930 Crore. Digital payments (cards and internet banking) represented the largest proportion in terms of total incident count.',
    sourceName: 'Reserve Bank of India (RBI) Annual Report 2023-24',
    sourceUrl: 'https://www.rbi.org.in/',
    region: 'India',
    keyTakeaway: 'Small-value digital transactions account for the vast majority of volume, emphasizing the importance of transaction alerts and daily caps.'
  },
  {
    id: 'stat-4',
    statNumber: '$10 Billion+',
    metricLabel: 'Reported Consumer Losses to Fraud',
    year: '2023',
    description: 'The US Federal Trade Commission (FTC) Consumer Sentinel Network reported consumers lost more than $10 Billion to fraud in 2023, a 14% increase over the previous year. Impersonation scams were the most commonly reported category.',
    sourceName: 'FTC Consumer Sentinel Network Data Book',
    sourceUrl: 'https://www.ftc.gov/news-events/news/press-releases/2024/02/nationwide-fraud-losses-top-10-billion-2023-ftc-reports',
    region: 'United States',
    keyTakeaway: 'Bank transfers and cryptocurrency accounted for the highest aggregate monetary losses among payment methods.'
  },
  {
    id: 'stat-5',
    statNumber: '$12.5 Billion',
    metricLabel: 'Total Cybercrime Losses Reported to FBI',
    year: '2023',
    description: 'The Federal Bureau of Investigation Internet Crime Complaint Center (IC3) received 880,418 complaints with potential losses exceeding $12.5 Billion. Investment fraud was the single costliest scheme, totaling $4.57 Billion.',
    sourceName: 'FBI Internet Crime Complaint Center (IC3) Annual Report',
    sourceUrl: 'https://www.ic3.gov/Media/PDF/AnnualReport/2023_IC3Report.pdf',
    region: 'Global',
    keyTakeaway: 'Cryptocurrency investment scams and romance/confidence fraud ("Pig Butchering") caused the steepest spike in victim damages.'
  },
  {
    id: 'stat-6',
    statNumber: '₹1,000+ Crore',
    metricLabel: 'Funds Successfully Frozen by 1930 Helpline',
    year: '2023 - 2024',
    description: 'Through the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) integrated with Helpline 1930 and banks, law enforcement has successfully saved and frozen over ₹1,000 Crore before cyber criminals could withdraw it.',
    sourceName: 'National Cybercrime Reporting Portal (NCRP)',
    sourceUrl: 'https://cybercrime.gov.in/',
    region: 'India',
    keyTakeaway: 'Speed is paramount: reporting within 1 to 2 hours of an unauthorized transfer increases the retrieval rate from under 10% to over 65%.'
  }
];
