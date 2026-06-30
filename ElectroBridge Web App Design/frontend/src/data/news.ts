export interface NewsData {
  id: number;
  source: string;
  sourceColor: string;
  time: string;
  headline: string;
  summary: string;
  tags: string[];
  category: string;
}

export const NEWS_ITEMS: NewsData[] = [
  {
    id: 1,
    source: 'IEEE Spectrum',
    sourceColor: '#00E5FF',
    time: '2h ago',
    headline: 'TSMC Announces 2nm Node Production Ramp with Backside Power Delivery',
    summary: 'TSMC confirms volume production of N2 node begins Q4 2025, featuring industry-first backside power delivery and nanosheet transistors for 10–15% performance uplift.',
    tags: ['TSMC', '2nm', 'Semiconductor', 'Foundry'],
    category: 'Semiconductor',
  },
  {
    id: 2,
    source: 'EE Times',
    sourceColor: '#3B82F6',
    time: '4h ago',
    headline: 'NVIDIA Blackwell Ultra B300 Delivers 1.5x AI Training Speed Over B200',
    summary: 'New benchmarks from MLCommons show NVIDIA\'s Blackwell Ultra architecture outperforms its predecessor with 288GB HBM3e and 10 PetaFLOPS of FP8 compute.',
    tags: ['NVIDIA', 'AI Chips', 'HPC', 'GPU'],
    category: 'AI Chips',
  },
  {
    id: 3,
    source: 'Semiconductor Today',
    sourceColor: '#10B981',
    time: '6h ago',
    headline: 'IIT Bombay Researchers Demonstrate Room-Temperature Quantum Dot Single Photon Emitter',
    summary: 'A team from IIT Bombay\'s CRNTS has fabricated colloidal InP quantum dots capable of on-demand single photon emission at 300K, a breakthrough for integrated photonics.',
    tags: ['Quantum Dots', 'Photonics', 'IIT Bombay', 'Research'],
    category: 'Research',
  },
  {
    id: 4,
    source: 'Digit India',
    sourceColor: '#F59E0B',
    time: '8h ago',
    headline: 'India\'s Semiconductor Mission Approves ₹76,000 Cr Fab in Dholera SEZ',
    summary: 'The Union Cabinet has greenlit TATA Electronics\' proposed 28nm fab in Gujarat\'s Dholera SEZ, expected to generate over 20,000 direct jobs by 2028.',
    tags: ['India', 'Fab', 'Policy', 'TATA'],
    category: 'India',
  },
  {
    id: 5,
    source: 'EDN Network',
    sourceColor: '#8B5CF6',
    time: '12h ago',
    headline: 'VLSI Design Jobs Surge 34% YoY in India as Global Chip Giants Expand R&D',
    summary: 'Hiring data from NASSCOM shows a 34% jump in VLSI/ASIC design roles in India in H1 2025, driven by expansions from Qualcomm, Intel, and Samsung semiconductors.',
    tags: ['VLSI', 'Jobs', 'India', 'Industry'],
    category: 'Jobs',
  },
];
