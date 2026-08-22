import { OrwellFactor } from '../types';

export const ORWELL_ASSESSMENT_METADATA = {
  subject: "TODAY'S INDIA",
  lastUpdated: 'August 2026',
  totalFactors: 7,
  disclaimer: 'Orwell did not create a formal 7-factor autocracy test. This is an editorial framework inspired by recurring ideas in Orwell\'s published writings.',
  methodologyOverview: 'This assessment evaluates legal, media, and institutional patterns against 7 plain-language concepts derived from George Orwell\'s published essays and books. A status of "FLAGGED" indicates current documented evidence fits that specific indicator. It is an editorial framework, not a formal academic autocracy index.'
};

export const ORWELL_FACTORS: OrwellFactor[] = [
  {
    id: 1,
    numberCode: '01',
    title: 'REWRITING HISTORY',
    plainMeaning: 'Altering or suppressing facts, history, or records to fit an official narrative.',
    orwellSource: '1984 (Part 1, Ch 3) & The Prevention of Literature (1946)',
    orwellText: 'Orwell warned of rewriting history, writing: "Who controls the past controls the future: who controls the present controls the past." Totalitarianism constantly alters records so the ruling doctrine always appears right.',
    lookForIndicators: [
      'Removing historical eras, events, or non-aligned figures from school textbooks',
      'Delaying or suppressing official census and economic data',
      'Pressuring academic and archival bodies to align with official history'
    ],
    status: 'FLAGGED',
    reasoning: 'NCERT textbook removals (Mughal era, Gujarat riots, non-aligned movement) and multi-year delays to the Decennial Census show clear history and data revision. Officials cite curriculum rationalization.',
    evidenceDate: '2026-03-15',
    sources: [
      { title: 'NCERT Curriculum Revision Analysis', url: 'https://thehindu.com', publisher: 'The Hindu' },
      { title: 'Decennial Census Delay Assessment', url: 'https://epw.in', publisher: 'Economic & Political Weekly' }
    ]
  },
  {
    id: 2,
    numberCode: '02',
    title: 'NEWSPEAK & EUPHEMISMS',
    plainMeaning: 'Using vague or bureaucratic language to mask coercion, violence, and state action.',
    orwellSource: 'Politics and the English Language (1946)',
    orwellText: 'Orwell wrote: "Political language is designed to make lies sound truthful and murder respectable..." He showed how bureaucratic buzzwords make harsh state actions sound routine.',
    lookForIndicators: [
      'Labeling punitive property demolitions as "encroachment drives"',
      'Framing internet blackouts as "precautionary harmony measures"',
      'Calling pre-emptive detentions of protesters "routine order maintenance"'
    ],
    status: 'FLAGGED',
    reasoning: 'Official phrasing uses terms like "anti-encroachment drives" for punitive demolitions targeting activists before trial. Authorities state these are routine municipal actions.',
    evidenceDate: '2025-11-10',
    sources: [
      { title: 'Supreme Court Ruling on Demolition Procedures', url: 'https://sci.gov.in', publisher: 'Supreme Court of India' },
      { title: 'Amnesty Report on Punitive Demolitions', url: 'https://amnesty.org', publisher: 'Amnesty International' }
    ]
  },
  {
    id: 3,
    numberCode: '03',
    title: 'BLIND NATIONALISM',
    plainMeaning: 'Prioritizing political or national loyalty over independent facts.',
    orwellSource: 'Notes on Nationalism (1945)',
    orwellText: 'Orwell noted that nationalists demand blind loyalty, where actions are judged solely by political alignment rather than truth: "human beings can be classified like insects."',
    lookForIndicators: [
      'Demanding public loyalty tests during election campaigns',
      'Equating criticism of government policy with national betrayal',
      'Praising democracy globally while expanding preventive detention laws locally'
    ],
    status: 'FLAGGED',
    reasoning: 'Media rhetoric frequently labels policy dissent as anti-national betrayal. Meanwhile, official speeches champion democracy while expanding strict anti-terror laws (UAPA).',
    evidenceDate: '2026-01-08',
    sources: [
      { title: 'Study on Media Polarization & Loyalty Rhetoric', url: 'https://cprindia.org', publisher: 'Centre for Policy Research' },
      { title: 'UAPA Bail Statutory Analysis', url: 'https://livelaw.in', publisher: 'LiveLaw' }
    ]
  },
  {
    id: 4,
    numberCode: '04',
    title: 'DEMONIZING OPPONENTS',
    plainMeaning: 'Framing critics and political rivals as traitors or threats rather than legitimate opponents.',
    orwellSource: '1984 (Part 1, Ch 1: Two Minutes Hate)',
    orwellText: 'Orwell showed how states invent internal enemies to channel public anger: "The object of persecution is persecution. The object of power is power."',
    lookForIndicators: [
      'Labeling peaceful protesters and student leaders as foreign-funded agitators',
      'Portraying minority communities as demographic security threats',
      'Using tax and agency raids selectively against opposition leaders and NGOs'
    ],
    status: 'FLAGGED',
    reasoning: 'Agency probes (ED/IT) overwhelmingly target opposition figures and NGOs, while political rhetoric paints minorities and activists as internal threats. Officials maintain agencies act independently.',
    evidenceDate: '2026-04-18',
    sources: [
      { title: 'Enforcement Directorate Investigation Statistics', url: 'https://factly.in', publisher: 'Factly India' },
      { title: 'UN Special Rapporteur Statement on Minority Rights', url: 'https://ohchr.org', publisher: 'UN OHCHR' }
    ]
  },
  {
    id: 5,
    numberCode: '05',
    title: 'SILENCING DISSENT',
    plainMeaning: 'Using legal threats, censorship, and surveillance to make free expression dangerous.',
    orwellSource: 'The Freedom of the Press (1945)',
    orwellText: 'Orwell wrote: "If liberty means anything at all it means the right to tell people what they do not want to hear," warning against state censorship and self-censorship.',
    lookForIndicators: [
      'Declining press freedom ranks and corporate takeovers of newsrooms',
      'IT rules empowering government bodies to order online content takedowns',
      'Detaining journalists under anti-terror laws (UAPA/NSA) for reporting'
    ],
    status: 'FLAGGED',
    reasoning: 'India\'s low Press Freedom Index ranking (159th) and IT Rule takedowns show heavy media pressure. Officials dispute RSF methods, citing active daily press diversity.',
    evidenceDate: '2026-05-03',
    sources: [
      { title: 'RSF Press Freedom Index Entry for India', url: 'https://rsf.org', publisher: 'Reporters Without Borders' },
      { title: 'Legal Challenge to IT Rules 2021', url: 'https://internetfreedom.in', publisher: 'Internet Freedom Foundation' }
    ]
  },
  {
    id: 6,
    numberCode: '06',
    title: 'MASS PROPAGANDA',
    plainMeaning: 'Flooding media with coordinated messaging until an official narrative dominates.',
    orwellSource: 'Looking Back on the Spanish War (1943) & 1984',
    orwellText: 'Orwell warned that "the very concept of objective truth is fading out of the world," replaced by mass propaganda repeated until accepted as fact.',
    lookForIndicators: [
      'Primetime news channels broadcasting identical state-aligned headlines',
      'Automated social media campaigns amplifying official messaging',
      'Cutting opposition speeches and dissent from state broadcasts'
    ],
    status: 'INSUFFICIENT_EVIDENCE',
    reasoning: 'While main TV channels echo official lines, India\'s active regional press, digital outlets, and independent channels prevent total narrative control.',
    evidenceDate: '2026-04-02',
    sources: [
      { title: 'Study on Regional Press Diversity in India', url: 'https://thehoot.org', publisher: 'The Hoot' },
      { title: 'Digital News Consumption Patterns in India', url: 'https://reutersinstitute.politics.ox.ac.uk', publisher: 'Reuters Institute' }
    ]
  },
  {
    id: 7,
    numberCode: '07',
    title: 'PERSECUTION OF DISSENT',
    plainMeaning: 'Making public disagreement legally, financially, or personally costly.',
    orwellSource: 'Why I Write (1946) & 1984',
    orwellText: 'Orwell noted how authoritarian systems penalize dissent: "In a time of deceit telling the truth is a revolutionary act."',
    lookForIndicators: [
      'Freezing bank accounts of NGOs, legal aid funds, and donors',
      'Using spyware, facial recognition, and digital tracking on activists',
      'Employment or academic penalties for participating in protests'
    ],
    status: 'INSUFFICIENT_EVIDENCE',
    reasoning: 'Specific NGO account freezes (FCRA) and spyware reports (Pegasus) exist, but widespread daily protests and judicial challenges show mass retaliation is not systemic.',
    evidenceDate: '2026-02-20',
    sources: [
      { title: 'FCRA Compliance & NGO Registration Data', url: 'https://mha.gov.in', publisher: 'Ministry of Home Affairs' },
      { title: 'Supreme Court Pegasus Technical Committee Report', url: 'https://sci.gov.in', publisher: 'Supreme Court of India' }
    ]
  }
];
