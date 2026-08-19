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
    title: 'CHANGING THE STORY',
    plainMeaning: 'Altering or suppressing inconvenient facts, history, or reality to fit the preferred official narrative.',
    orwellSource: '1984 (Part 1, Ch 3) & The Prevention of Literature (1946)',
    orwellText: 'Orwell warned of systematic alterations of historical records and official archives, writing: "Who controls the past controls the future: who controls the present controls the past." He observed that totalitarianism demands a continuous re-writing of history to ensure the ruling doctrine appears infallibly consistent.',
    lookForIndicators: [
      'Removal of historical eras, riots, or non-aligned leaders from national school textbooks',
      'Official distortion or suppression of decennial census data and consumer expenditure surveys',
      'Pressuring archives and academic bodies to adopt politically convenient historical accounts'
    ],
    status: 'FLAGGED',
    reasoning: 'National textbook revisions by NCERT (removing chapters on the Mughal era, 2002 Gujarat riots, and non-aligned movements) alongside multi-year delays in the Decennial Census provide documented evidence of historical and data revisionism. Government officials maintain revisions were done for post-pandemic curriculum rationalization.',
    evidenceDate: '2026-03-15',
    sources: [
      { title: 'NCERT Curriculum Revision Analysis', url: 'https://thehindu.com', publisher: 'The Hindu' },
      { title: 'Decennial Census Delay Assessment', url: 'https://epw.in', publisher: 'Economic & Political Weekly' }
    ]
  },
  {
    id: 2,
    numberCode: '02',
    title: 'HARMFUL LANGUAGE, SOFTENED',
    plainMeaning: 'Using pleasant, vague, or bureaucratic language to disguise coercion, violence, censorship, or other harmful actions.',
    orwellSource: 'Politics and the English Language (1946)',
    orwellText: 'Orwell wrote: "Political language is designed to make lies sound truthful and murder respectable, and to give an appearance of solidity to pure wind." He showed how bureaucratic euphemisms make harsh administrative actions palatable.',
    lookForIndicators: [
      'Reframing punitive property demolitions as "clearing illegal encroachments"',
      'Labelling unannounced mobile internet shutdowns as "precautionary harmony measures"',
      'Describing pre-emptive detentions of marchers as "administrative order maintenance"'
    ],
    status: 'FLAGGED',
    reasoning: 'Administrative phrasing frequently substitutes euphemistic terminology for punitive measures, such as "anti-encroachment drives" targeting protest figures before judicial trial. Police authorities contend these terms represent standard statutory municipal codes.',
    evidenceDate: '2025-11-10',
    sources: [
      { title: 'Supreme Court Ruling on Demolition Procedures', url: 'https://sci.gov.in', publisher: 'Supreme Court of India' },
      { title: 'Amnesty Report on Punitive Demolitions', url: 'https://amnesty.org', publisher: 'Amnesty International' }
    ]
  },
  {
    id: 3,
    numberCode: '03',
    title: 'LOYALTY OVER TRUTH',
    plainMeaning: 'Treating political, ideological, or national loyalty as more important than independently examining facts.',
    orwellSource: 'Notes on Nationalism (1945)',
    orwellText: 'Orwell defined political nationalism as "the habit of assuming that human beings can be classified like insects," noting that nationalists demand absolute loyalty where actions are judged solely by political affiliation rather than truth.',
    lookForIndicators: [
      'Demanding public pledges of national unity during electoral campaigns',
      'Equating criticism of specific government policies with betrayal of the nation itself',
      'Using doublethink to praise global democratic ideals while expanding local preventive detention laws'
    ],
    status: 'FLAGGED',
    reasoning: 'Dominant media and political rhetoric routinely frames policy dissent as anti-national betrayal. Meanwhile, official diplomacy highlights democratic commitment while expanding bail-restrictive anti-terror laws (UAPA). State representatives argue strong laws are vital against external security threats.',
    evidenceDate: '2026-01-08',
    sources: [
      { title: 'Study on Media Polarization & Loyalty Rhetoric', url: 'https://cprindia.org', publisher: 'Centre for Policy Research' },
      { title: 'UAPA Bail Statutory Analysis', url: 'https://livelaw.in', publisher: 'LiveLaw' }
    ]
  },
  {
    id: 4,
    numberCode: '04',
    title: 'ENEMIES, NOT OPPONENTS',
    plainMeaning: 'Framing critics and political opponents as threats, traitors, or enemies instead of legitimate participants in political disagreement.',
    orwellSource: '1984 (Part 1, Ch 1: Two Minutes Hate)',
    orwellText: 'Orwell described how state propaganda creates designated internal enemies to direct public anxiety outward: "The object of persecution is persecution. The object of power is power."',
    lookForIndicators: [
      'Framing peaceful farm or student organizers as foreign-funded agitators',
      'Targeted campaign rhetoric portraying religious minority groups as demographic security threats',
      'Selective financial investigations against opposition leaders and non-profit founders'
    ],
    status: 'FLAGGED',
    reasoning: 'Investigative agency probes (ED/IT) overwhelmingly target opposition leaders and civil society figures, alongside campaign narratives portraying minority communities and activists as internal threats. Government spokespersons maintain investigative agencies act independently on financial data.',
    evidenceDate: '2026-04-18',
    sources: [
      { title: 'Enforcement Directorate Investigation Statistics', url: 'https://factly.in', publisher: 'Factly India' },
      { title: 'UN Special Rapporteur Statement on Minority Rights', url: 'https://ohchr.org', publisher: 'UN OHCHR' }
    ]
  },
  {
    id: 5,
    numberCode: '05',
    title: 'CONTROLLING WHAT YOU CAN SAY',
    plainMeaning: 'Using censorship, intimidation, legal restrictions, surveillance, or punishment to make certain forms of expression difficult or dangerous.',
    orwellSource: 'The Freedom of the Press (1945)',
    orwellText: 'Orwell wrote in his unpublished preface to Animal Farm: "If liberty means anything at all it means the right to tell people what they do not want to hear." He warned against both state censorship and media self-censorship.',
    lookForIndicators: [
      'Declining national press freedom rankings and corporate takeovers of independent newsrooms',
      'IT Rules amendments empowering government units to order online content takedowns',
      'Using anti-terror statutes (UAPA/NSA) to detain journalists for reporting or commentary'
    ],
    status: 'FLAGGED',
    reasoning: 'India\'s ranking in the Reporters Without Borders (RSF) World Press Freedom Index (159th) and regulatory notices under IT Rules confirm significant pressure on media outlets. State officials counter that RSF methodology is subjective and point to thousands of active daily newspapers and independent channels.',
    evidenceDate: '2026-05-03',
    sources: [
      { title: 'RSF Press Freedom Index Entry for India', url: 'https://rsf.org', publisher: 'Reporters Without Borders' },
      { title: 'Legal Challenge to IT Rules 2021', url: 'https://internetfreedom.in', publisher: 'Internet Freedom Foundation' }
    ]
  },
  {
    id: 6,
    numberCode: '06',
    title: 'PROPAGANDA & REPETITION',
    plainMeaning: 'Repeatedly flooding the public sphere with official or coordinated messaging until a preferred narrative dominates public understanding.',
    orwellSource: 'Looking Back on the Spanish War (1943) & 1984',
    orwellText: 'Orwell observed with horror that "the very concept of objective truth is fading out of the world," replaced by mass-produced state propaganda repeated until accepted as reality.',
    lookForIndicators: [
      'Coordinated primetime news broadcasts broadcasting identical state-aligned headlines',
      'Systematic social media campaign amplification using automated networks',
      'Erasure of opposition speeches or dissenting viewpoints from state broadcast networks'
    ],
    status: 'INSUFFICIENT_EVIDENCE',
    reasoning: 'While mainstream television news displays strong alignment with ruling party messaging, India\'s media ecosystem features vibrant regional language newspapers, robust independent YouTube journalism channels, and active digital outlets presenting opposing perspectives. Evidence does not establish total information control.',
    evidenceDate: '2026-04-02',
    sources: [
      { title: 'Study on Regional Press Diversity in India', url: 'https://thehoot.org', publisher: 'The Hoot' },
      { title: 'Digital News Consumption Patterns in India', url: 'https://reutersinstitute.politics.ox.ac.uk', publisher: 'Reuters Institute' }
    ]
  },
  {
    id: 7,
    numberCode: '07',
    title: 'HIGH COST OF DISSENT',
    plainMeaning: 'Making disagreement personally, professionally, socially, financially, or legally costly.',
    orwellSource: 'Why I Write (1946) & 1984',
    orwellText: 'Orwell highlighted how authoritarian systems make non-conformity dangerous to personal livelihood: "In a time of deceit telling the truth is a revolutionary act."',
    lookForIndicators: [
      'Freezing bank accounts of non-profits, international donors, and legal aid funds',
      'Digital surveillance, facial recognition logging, and spyware deployment against activists',
      'Employment retaliation or university disciplinary actions against participating protesters'
    ],
    status: 'NOT_FLAGGED',
    reasoning: 'While specific high-profile NGO account freezes (under FCRA regulations) and Pegasus spyware allegations have been documented, widespread public protests, judicial challenges, and academic dissent continue to occur daily across Indian states without systemic mass retaliation against general citizens.',
    evidenceDate: '2026-02-20',
    sources: [
      { title: 'FCRA Compliance & NGO Registration Data', url: 'https://mha.gov.in', publisher: 'Ministry of Home Affairs' },
      { title: 'Supreme Court Pegasus Technical Committee Report', url: 'https://sci.gov.in', publisher: 'Supreme Court of India' }
    ]
  }
];
