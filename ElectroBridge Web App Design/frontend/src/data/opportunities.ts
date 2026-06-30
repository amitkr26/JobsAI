export interface OpportunityData {
  id: number;
  title: string;
  org: string;
  verified: boolean;
  location: string;
  stipend: string;
  deadline: string;
  daysLeft: number;
  tags: string[];
  type: string;
  degree: string;
  saved: boolean;
  logo: string;
  color: string;
  description: string;
}

export const OPPORTUNITIES: OpportunityData[] = [
  {
    id: 1,
    title: 'VLSI Design Engineer Internship',
    org: 'ISRO — Indian Space Research Organisation',
    verified: true,
    location: 'Bengaluru, Karnataka',
    stipend: '₹35,000/mo',
    deadline: 'Aug 15, 2025',
    daysLeft: 47,
    tags: ['VLSI', 'Cadence', 'RTL Design', 'Gate-level'],
    type: 'Internship',
    degree: 'B.Tech / M.Tech',
    saved: false,
    logo: 'IS',
    color: '#F59E0B',
    description: 'Work on cutting-edge ASIC design flows for satellite payloads. Hands-on with industry EDA tools.',
  },
  {
    id: 2,
    title: 'Semiconductor Process R&D Fellowship',
    org: 'IISc — Indian Institute of Science',
    verified: true,
    location: 'Bengaluru, Karnataka',
    stipend: '₹42,000/mo',
    deadline: 'Jul 30, 2025',
    daysLeft: 31,
    tags: ['Semiconductor', 'CVD', 'Cleanroom', 'Photolithography'],
    type: 'Research Fellowship',
    degree: 'M.Tech / PhD',
    saved: true,
    logo: 'II',
    color: '#3B82F6',
    description: 'Join the nano-fabrication lab for advanced process development in 5nm node technologies.',
  },
  {
    id: 3,
    title: 'AI Chip Architecture Research Intern',
    org: 'Intel India R&D',
    verified: true,
    location: 'Hyderabad, Telangana',
    stipend: '₹60,000/mo',
    deadline: 'Sep 1, 2025',
    daysLeft: 64,
    tags: ['AI Accelerator', 'SystemVerilog', 'Arch sim', 'ML'],
    type: 'Internship',
    degree: 'M.Tech / PhD',
    saved: false,
    logo: 'IN',
    color: '#00E5FF',
    description: 'Research on next-gen neural processing units. Collaborate with global teams on micro-architectural innovations.',
  },
  {
    id: 4,
    title: 'PhD Scholarship — Spintronics & Quantum Devices',
    org: 'TIFR — Tata Institute of Fundamental Research',
    verified: true,
    location: 'Mumbai, Maharashtra',
    stipend: '₹37,000/mo',
    deadline: 'Aug 10, 2025',
    daysLeft: 42,
    tags: ['Spintronics', 'Quantum', 'MBE', 'Research'],
    type: 'PhD Scholarship',
    degree: 'B.Tech / M.Tech',
    saved: false,
    logo: 'TI',
    color: '#8B5CF6',
    description: 'Fully funded PhD program exploring quantum coherence in spintronic devices for next-gen memory.',
  },
  {
    id: 5,
    title: 'Embedded Systems Engineer — EV Division',
    org: 'Tata Motors Ltd.',
    verified: true,
    location: 'Pune, Maharashtra',
    stipend: '₹8.5 LPA',
    deadline: 'Jul 20, 2025',
    daysLeft: 21,
    tags: ['Embedded C', 'CAN Bus', 'AUTOSAR', 'RTOS'],
    type: 'Full-time',
    degree: 'B.Tech',
    saved: false,
    logo: 'TM',
    color: '#10B981',
    description: 'Design and validate embedded firmware for EV battery management systems and motor controllers.',
  },
  {
    id: 6,
    title: 'RF & Microwave Engineer Trainee',
    org: 'DRDO — DLRL Laboratory',
    verified: false,
    location: 'Hyderabad, Telangana',
    stipend: '₹25,000/mo',
    deadline: 'Aug 5, 2025',
    daysLeft: 37,
    tags: ['RF', 'Microwave', 'Radar', 'Signal Processing'],
    type: 'Trainee',
    degree: 'B.Tech / M.Tech',
    saved: false,
    logo: 'DR',
    color: '#EF4444',
    description: 'Develop and test RF subsystems for defense radar applications. Work in state-of-the-art facilities.',
  },
];
