import { Tactic, CategoryType, CategoryInfo } from '../types';

export const CATEGORIES: Record<CategoryType, CategoryInfo> = {
  RHETORIC: {
    name: 'RHETORIC',
    label: 'Rhetoric',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    badgeText: 'text-rose-700',
    borderColor: 'border-rose-300',
    accentColor: '#F43F5E',
    description: 'Deceptive vocabulary, smears, deflections, and extremist labeling.'
  },
  MEDIA: {
    name: 'MEDIA',
    label: 'Media Control',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    badgeText: 'text-purple-700',
    borderColor: 'border-purple-300',
    accentColor: '#8B5CF6',
    description: 'Narrative manipulation, selective amplification, and information flooding.'
  },
  LEGAL: {
    name: 'LEGAL',
    label: 'Law & Courts',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    badgeText: 'text-blue-700',
    borderColor: 'border-blue-300',
    accentColor: '#3B82F6',
    description: 'Protest restrictions, arrests, bail denials, and legal harassment.'
  },
  POLICING: {
    name: 'POLICING',
    label: 'Police & Force',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    badgeText: 'text-amber-700',
    borderColor: 'border-amber-300',
    accentColor: '#F59E0B',
    description: 'Barricades, transit blocks, and heavy police deployment.'
  },
  SURVEILLANCE: {
    name: 'SURVEILLANCE',
    label: 'Surveillance',
    badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    badgeText: 'text-cyan-700',
    borderColor: 'border-cyan-300',
    accentColor: '#06B6D4',
    description: 'Facial recognition, digital tracking, and phone monitoring.'
  },
  ECONOMIC: {
    name: 'ECONOMIC',
    label: 'Economic Pressure',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'text-emerald-700',
    borderColor: 'border-emerald-300',
    accentColor: '#10B981',
    description: 'Funding cuts, bank account freezes, and asset seizures.'
  },
  PSYCHOLOGICAL: {
    name: 'PSYCHOLOGICAL',
    label: 'Psychological',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    badgeText: 'text-indigo-700',
    borderColor: 'border-indigo-300',
    accentColor: '#6366F1',
    description: 'Intimidation, fear campaigns, public shaming, and internet bans.'
  },
  ORGANIZATIONAL: {
    name: 'ORGANIZATIONAL',
    label: 'Infiltration',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    badgeText: 'text-teal-700',
    borderColor: 'border-teal-300',
    accentColor: '#14B8A6',
    description: 'Infiltration, divide-and-conquer, and co-opting moderate factions.'
  },
  POLITICAL: {
    name: 'POLITICAL',
    label: 'Political Strategy',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-300',
    badgeText: 'text-orange-700',
    borderColor: 'border-orange-300',
    accentColor: '#F97316',
    description: 'Committee delays, cosmetic concessions, and stalling.'
  },
  INFORMATION: {
    name: 'INFORMATION',
    label: 'Information Ops',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeText: 'text-sky-700',
    borderColor: 'border-sky-300',
    accentColor: '#0284C7',
    description: 'State propaganda, repeated messaging, and information dominance.'
  }
};

export const MASTER_TACTICS: Tactic[] = [
  {
    id: 'rh-1',
    code: 'RH-01',
    title: 'PUBLIC DISCREDITING CAMPAIGNS',
    shortDesc: 'Launches targeted character assassination against key organizers and movements.',
    fullDesc: 'Leaking personal financial, romantic, or lifestyle details to discredit organizers rather than answering their demands.',
    category: 'RHETORIC',
    historicalExample: 'FBI COINTELPRO operations against Martin Luther King Jr. and anti-war figures.'
  },
  {
    id: 'lg-1',
    code: 'LG-01',
    title: 'RESTRICT PROTESTS & ASSEMBLIES',
    shortDesc: 'Confines protests to remote zones or revokes permits right before rallies.',
    fullDesc: 'Issuing rally permits exclusively for out-of-the-way fields or barricaded enclosures far from decision makers.',
    category: 'LEGAL',
    historicalExample: 'Free Speech Zones during political conventions and strict rally permit rules.'
  },
  {
    id: 'sv-1',
    code: 'SV-01',
    title: 'DIGITAL SURVEILLANCE & MONITORING',
    shortDesc: 'Monitors private chats, crowd face identities, and phone metadata.',
    fullDesc: 'Using facial recognition cameras, drones, cell-site simulators, and spyware to track activists.',
    category: 'SURVEILLANCE',
    historicalExample: 'Deployment of automated face-scanning vans and mobile phone surveillance.'
  },
  {
    id: 'md-1',
    code: 'MD-01',
    title: 'MANIPULATE MEDIA NARRATIVE',
    shortDesc: 'Floods aligned media channels with coordinated counter-stories.',
    fullDesc: 'Using loyal media networks to launch distracting news cycles whenever a movement gains momentum.',
    category: 'MEDIA',
    historicalExample: 'Documented during European labor strikes and Latin American democracy demonstrations.'
  },
  {
    id: 'og-1',
    code: 'OG-01',
    title: 'INFILTRATE & DIVIDE THE MOVEMENT',
    shortDesc: 'Sends provocateurs or offers secret deals to split coalition unity.',
    fullDesc: 'Infiltrating secret agents into marches to incite damage or offering favors to moderates to isolate radicals.',
    category: 'ORGANIZATIONAL',
    historicalExample: 'Agent provocateur operations documented in French, US, and Russian protest histories.'
  },
  {
    id: 'rh-2',
    code: 'RH-02',
    title: 'LABEL AS ANTI-NATIONAL OR EXTREMIST',
    shortDesc: 'Labels peaceful marchers as dangerous radicals or disloyal traitors.',
    fullDesc: 'Painting policy criticism as disloyalty to the country itself to strip demonstrators of public legitimacy.',
    category: 'RHETORIC',
    historicalExample: 'Widespread during the McCarthy era in 1950s US and various nationalist regimes globally.'
  },
  {
    id: 'ec-1',
    code: 'EC-01',
    title: 'ECONOMIC PRESSURE & RESTRICTIONS',
    shortDesc: 'Imposes job threats, tax audits, or regulatory hurdles on movement supporters.',
    fullDesc: 'Using revenue agencies and commercial leverage to discipline participating workers and businesses.',
    category: 'ECONOMIC',
    historicalExample: 'Blacklisting of striking workers during US industrial labor movements.'
  },
  {
    id: 'lg-2',
    code: 'LG-02',
    title: 'ARREST & DETAIN LEADERSHIP',
    shortDesc: 'Detains key organizers hours before scheduled peaceful rallies.',
    fullDesc: 'Using preventative detention statutes to snatch key logistics organizers from their homes.',
    category: 'LEGAL',
    historicalExample: 'Utilized prior to global climate summits and major industrial sit-ins.'
  },
  {
    id: 'md-2',
    code: 'MD-02',
    title: 'AMPLIFY ISOLATED INCIDENTS',
    shortDesc: 'Obsessively broadcasts single acts of damage to overshadow peaceful crowds.',
    fullDesc: 'Fixating news coverage on a single broken window or burning bin to represent thousands of peaceful marchers.',
    category: 'MEDIA',
    historicalExample: 'Common in TV coverage of environmental sit-ins and racial justice marches.'
  },
  {
    id: 'ps-1',
    code: 'PS-01',
    title: 'SPREAD FEAR & INTIMIDATION',
    shortDesc: 'Sends security personnel to visit activist families or threatens legal action.',
    fullDesc: 'Conducting late-night visits to parents or spouses to warn them of severe consequences if their family member continues organizing.',
    category: 'PSYCHOLOGICAL',
    historicalExample: 'Standard intimidation tactic documented by international human rights groups.'
  },
  {
    id: 'lg-3',
    code: 'LG-03',
    title: 'MISUSE LAWS & LEGAL HARASSMENT',
    shortDesc: 'Files frivolous lawsuits, SLAPP suits, or minor permit infractions against marchers.',
    fullDesc: 'Strictly enforcing obscure Jaywalking rules or permit noise caps against protesters while ignoring pro-government events.',
    category: 'LEGAL',
    historicalExample: 'Strategic Lawsuits Against Public Participation (SLAPP) against anti-pollution non-profits.'
  },
  {
    id: 'og-2',
    code: 'OG-02',
    title: 'CO-OPT MODERATE VOICES',
    shortDesc: 'Offers minor secret concessions to moderate leaders to denounce radicals.',
    fullDesc: 'Inviting selected moderate leaders to private meetings to grant minor favors in exchange for splitting the movement.',
    category: 'ORGANIZATIONAL',
    historicalExample: 'Classic strategy used against civil rights coalitions in the 1960s.'
  },
  {
    id: 'if-1',
    code: 'IF-01',
    title: 'PROPAGANDA & REPEATED MESSAGING',
    shortDesc: 'Floods public channels with repeated official state messaging until accepted.',
    fullDesc: 'Using mass broadcasting networks and automated social campaigns to repeat official narratives until alternative facts are crowded out.',
    category: 'INFORMATION',
    historicalExample: 'Mass information operations documented across 20th-century state broadcaster networks.'
  },
  {
    id: 'ec-2',
    code: 'EC-02',
    title: 'FUNDING CUTS & ASSET FREEZES',
    shortDesc: 'Blocks access to bank accounts and donor funds of advocacy groups.',
    fullDesc: 'Freezing organizational bank accounts without prior conviction to immediately halt logistics, legal aid, and food supply.',
    category: 'ECONOMIC',
    historicalExample: 'Freezing of crowd-funding and bank accounts during emergency decrees.'
  },
  {
    id: 'rh-3',
    code: 'RH-03',
    title: 'WHATABOUTISM & TOPIC DEFLECTION',
    shortDesc: 'Deflects criticism by accusing opponents of past or unrelated hypocrisy.',
    fullDesc: 'Answering specific documented policy failures by pointing to unrelated historical events or foreign country problems.',
    category: 'RHETORIC',
    historicalExample: 'Standard diplomatic and political communication tactic during international human rights debates.'
  },
  {
    id: 'lg-4',
    code: 'LG-04',
    title: 'PROLONGED DETENTION & BAIL DENIAL',
    shortDesc: 'Invokes anti-terror laws to keep activists in jail for years without trial.',
    fullDesc: 'Applying stringent security statutes that reverse the burden of proof, making pre-trial bail almost impossible to obtain.',
    category: 'LEGAL',
    historicalExample: 'Emergency detention laws in 1980s South Africa and British-era security statutes.'
  }
];
