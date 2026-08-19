import { DissLabel, LabelCategory, LabelCategoryInfo } from '../types';

/* ═══════════════════════════════════════════════════════════════
   CATEGORY DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */
export const LABEL_CATEGORIES: Record<LabelCategory, LabelCategoryInfo> = {
  NATIONALISM: {
    name: 'NATIONALISM',
    label: 'Nationalism',
    short: 'NAT',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    accentColor: '#F43F5E',
  },
  FOREIGN: {
    name: 'FOREIGN',
    label: 'Foreign Influence',
    short: 'FRNG',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    accentColor: '#3B82F6',
  },
  EXTREMISM: {
    name: 'EXTREMISM',
    label: 'Extremism',
    short: 'EXTR',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    accentColor: '#F59E0B',
  },
  RELIGION: {
    name: 'RELIGION',
    label: 'Religion / Polarization',
    short: 'REL',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    accentColor: '#8B5CF6',
  },
  MEDIA: {
    name: 'MEDIA',
    label: 'Media / Ideology',
    short: 'MED',
    badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    accentColor: '#06B6D4',
  },
  CLASS: {
    name: 'CLASS',
    label: 'Class / Elite',
    short: 'CLS',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentColor: '#10B981',
  },
};

/* ═══════════════════════════════════════════════════════════════
   MASTER DISSENT LABEL DATABASE
   
   Research policy:
   - Each label must have documented real-world usage
   - All examples reflect editorial characterization, not factual claims
   ═══════════════════════════════════════════════════════════════ */
export const MASTER_LABELS: DissLabel[] = [

  /* ── NATIONALISM ────────────────────────────────────────────── */
  {
    id: 'nat-01',
    code: 'NAT-01',
    shortLabel: 'ANTI NATIONAL',
    fullLabel: 'Anti-National',
    category: 'NATIONALISM',
    definition: 'A label implying the target works against the interests of the nation. Applied to critics, protesters, and journalists to strip their demands of legitimacy by reframing disagreement as treason.',
    usedAgainst: ['Student protesters', 'Journalists', 'Academics', 'Opposition politicians', 'Civil society'],
    examples: [
      {
        description: 'JNU students were labelled "anti-national" in national media following a campus event in February 2016. Student union president Kanhaiya Kumar was arrested under sedition charges.',
        speaker: 'Multiple ruling-party leaders and aligned TV anchors',
        target: 'JNU student union',
        date: '2016-02',
      },
      {
        description: 'Farmers\' protest leaders were called "anti-national" and accused of links to Khalistanis and Maoists during the 2020-21 Delhi protests.',
        speaker: 'BJP spokespersons and pro-government media',
        target: 'Farmers\' movement leaders',
        date: '2020-12',
      },
    ],
    country: 'India',
  },

  {
    id: 'nat-02',
    code: 'NAT-02',
    shortLabel: 'DESH DROHI',
    fullLabel: 'Desh Drohi (Nation Traitor)',
    category: 'NATIONALISM',
    definition: 'Hindi for "traitor to the nation." Carries more emotional charge than "anti-national" because it implies active betrayal rather than mere criticism. Often paired with anti-national in media coverage.',
    usedAgainst: ['Protesters', 'Critics', 'Journalists', 'Opposition figures'],
    examples: [
      {
        description: 'Label applied to critics of the Citizenship Amendment Act (CAA) protests, 2019–2020. Widely circulated on pro-government social media and some news channels.',
        target: 'CAA protestors, Muslim demonstrators',
        date: '2019-12',
      },
    ],
    country: 'India',
  },

  {
    id: 'nat-03',
    code: 'NAT-03',
    shortLabel: 'TUKDE TUKDE',
    fullLabel: 'Tukde-Tukde Gang (Piece-Piece Gang)',
    category: 'NATIONALISM',
    definition: 'Originated from alleged slogans at a JNU event in 2016. Now used as a catch-all for anyone perceived as separatist or divisive. The term has been used to describe journalists, academics, civil rights lawyers, and opposition politicians.',
    usedAgainst: ['Student activists', 'Journalists', 'Lawyers', 'Academics', 'Opposition politicians'],
    examples: [
      {
        description: 'Then Home Minister Amit Shah described a network of activists as the "tukde-tukde gang" in multiple public speeches, linking it to urban Naxals.',
        speaker: 'Amit Shah (BJP)',
        date: '2019',
      },
      {
        description: 'Several TV anchors and prime-time debates used the "tukde-tukde gang" framing to describe critics of the Bhima Koregaon accused and other civil liberties advocates.',
        date: '2018-2020',
      },
    ],
    country: 'India',
  },

  {
    id: 'nat-04',
    code: 'NAT-04',
    shortLabel: 'ANTI INDIA',
    fullLabel: 'Anti-India',
    category: 'NATIONALISM',
    definition: 'Similar to anti-national but with a geopolitical framing. Often used against diaspora critics, foreign-based journalists, or international observers who publish critical reports on India.',
    usedAgainst: ['Diaspora activists', 'Foreign journalists', 'International NGOs', 'Overseas Indian critics'],
    examples: [
      {
        description: 'The Indian government\'s official response to the BBC documentary on the 2002 Gujarat riots called it "anti-India propaganda."',
        speaker: 'MEA spokesperson (India)',
        date: '2023-01',
      },
      {
        description: 'Hindenburg Research\'s report on the Adani Group was described as "anti-India" by government ministers and aligned commentators.',
        date: '2023-02',
      },
    ],
    country: 'India',
  },

  {
    id: 'nat-05',
    code: 'NAT-05',
    shortLabel: 'SEDITIOUS',
    fullLabel: 'Seditious / Sedition',
    category: 'NATIONALISM',
    definition: 'A legal category (Section 124A IPC, now repealed but procedurally active) weaponized against critics. The label implies speech that "excites disaffection" against the government, even when directed at protected political dissent.',
    usedAgainst: ['Journalists', 'Academics', 'Activists', 'Comedians', 'Critics'],
    examples: [
      {
        description: 'Journalist Vinod Dua was charged with sedition after a YouTube video critical of the government\'s COVID response.',
        target: 'Vinod Dua (journalist)',
        date: '2020',
        url: 'https://thewire.in',
      },
      {
        description: 'Over 13,000 farmers were charged under sedition among other provisions following the 2020-21 farmers\' protests.',
        target: 'Farmers\' protest participants',
        date: '2021',
      },
    ],
    country: 'India',
  },

  /* ── FOREIGN INFLUENCE ──────────────────────────────────────── */
  {
    id: 'frng-01',
    code: 'FRG-01',
    shortLabel: 'FOREIGN AGENT',
    fullLabel: 'Foreign Agent',
    category: 'FOREIGN',
    definition: 'A label suggesting the target receives instructions or funding from foreign powers or entities and acts against Indian national interest. Often used to justify FCRA (Foreign Contribution Regulation Act) crackdowns on NGOs and media.',
    usedAgainst: ['NGOs', 'Journalists', 'Think tanks', 'Human rights organizations'],
    examples: [
      {
        description: 'Amnesty International India had its bank accounts frozen and was forced to shut down in India, following FCRA violations cited by the government.',
        target: 'Amnesty International India',
        date: '2020-09',
        url: 'https://amnesty.org',
      },
      {
        description: 'Greenpeace India had its FCRA license cancelled; government accused it of acting against "national economic interests" on behalf of foreign principals.',
        target: 'Greenpeace India',
        date: '2015',
      },
    ],
    country: 'India',
  },

  {
    id: 'frng-02',
    code: 'FRG-02',
    shortLabel: 'SOROS FUNDED',
    fullLabel: 'Soros-Funded',
    category: 'FOREIGN',
    definition: 'A conspiracy label imported from US right-wing discourse, alleging that critics are funded by billionaire George Soros through his Open Society Foundations. Used to delegitimize journalism, media, and civil society research without engaging the substance.',
    usedAgainst: ['Media organisations', 'Fact-checkers', 'Think tanks', 'NGO researchers'],
    examples: [
      {
        description: 'Multiple Indian politicians and pro-government commentators accused Hindenburg Research of being Soros-linked after their Adani report.',
        speaker: 'BJP leaders',
        date: '2023-02',
      },
      {
        description: 'OCCRP (Organised Crime and Corruption Reporting Project) investigations were dismissed as "Soros-funded propaganda" by government representatives after they covered Indian financial matters.',
        date: '2023',
      },
    ],
    country: 'India',
  },

  {
    id: 'frng-03',
    code: 'FRG-03',
    shortLabel: 'PAKISTAN BACKED',
    fullLabel: 'Pakistan-Backed',
    category: 'FOREIGN',
    definition: 'Alleges that a movement or individual is funded, directed, or supported by Pakistan, associating them with India\'s primary adversary in public imagination. Historically used against Kashmiris; now widely applied to any inconvenient movement.',
    usedAgainst: ['Kashmiri voices', 'Muslim protesters', 'Farmers\' leaders', 'Civil rights advocates'],
    examples: [
      {
        description: 'Ministers suggested Pakistani elements were behind the farmers\' protests to destabilize India during the 2020-21 Delhi protests.',
        speaker: 'Multiple BJP ministers',
        target: 'Farmers\' movement',
        date: '2021-01',
      },
      {
        description: 'CAA protesters in multiple cities were described in some TV coverage as "backed by Pakistan" or acting on behalf of Pakistani interests.',
        date: '2019-12',
      },
    ],
    country: 'India',
  },

  {
    id: 'frng-04',
    code: 'FRG-04',
    shortLabel: 'TOOLKIT GANG',
    fullLabel: 'Toolkit Gang',
    category: 'FOREIGN',
    definition: 'Emerged in February 2021 when a "toolkit" document about the farmers\' protests was shared by climate activist Greta Thunberg. The government and police treated this as a coordinated conspiracy; the label now applies to any perceived organized international criticism.',
    usedAgainst: ['Climate activists', 'Greta Thunberg supporters', 'International sympathizers', 'Diaspora groups'],
    examples: [
      {
        description: 'Mumbai Police filed an FIR naming activist Disha Ravi for sharing a farmers\' protest "toolkit," later dismissed. The document was a standard advocacy communication sheet.',
        target: 'Disha Ravi (climate activist)',
        date: '2021-02',
        url: 'https://thewire.in',
      },
      {
        description: 'Greta Thunberg\'s tweet with the farmers\' toolkit was described by Indian officials and media as part of a foreign conspiracy to destabilize India.',
        date: '2021-02',
      },
    ],
    country: 'India',
  },

  {
    id: 'frng-05',
    code: 'FRG-05',
    shortLabel: 'ISI AGENT',
    fullLabel: 'ISI Agent',
    category: 'FOREIGN',
    definition: 'Accuses the target of being an operative of Pakistan\'s Inter-Services Intelligence (ISI). Among the most severe delegitimizing labels because it implies active espionage and betrayal. Typically applied to Kashmiris, Muslim critics, or voices critical of security policy.',
    usedAgainst: ['Kashmiri journalists', 'Muslim critics', 'Peace activists', 'Opposition figures in Kashmir'],
    examples: [
      {
        description: 'Several Kashmiri journalists and activists have been arrested under PSA (Public Safety Act) or UAPA with PSA documentation alleging ISI links without published specific evidence.',
        date: '2018-2023',
      },
      {
        description: 'Politicians have accused opposition figures in Kashmir of acting as ISI agents in parliament and public speeches.',
        date: 'Ongoing',
      },
    ],
    country: 'India',
    note: 'Individual ISI accusation instances are documented; systematic attribution requires case-by-case verification.',
  },

  {
    id: 'frng-06',
    code: 'FRG-06',
    shortLabel: 'CHINESE AGENT',
    fullLabel: 'Chinese Agent',
    category: 'FOREIGN',
    definition: 'Alleges a target is acting on behalf of the Chinese state or CCP. Increased in frequency after the Galwan Valley clash (June 2020). Applied to critics of India\'s border policy or to academics and researchers with Chinese connections.',
    usedAgainst: ['Academics', 'Tech sector voices', 'Reporters covering China'],
    examples: [
      {
        description: 'Critics of the government\'s handling of the China border situation were accused of acting as "Chinese agents" on social media by pro-government accounts.',
        date: '2020-06',
      },
    ],
    country: 'India',
  },

  {
    id: 'frng-07',
    code: 'FRG-07',
    shortLabel: 'WESTERN STOOGE',
    fullLabel: 'Western Stooge',
    category: 'FOREIGN',
    definition: 'Implies the target serves Western governments or NGO interests rather than Indian ones. Often applied to journalists who publish internationally, human rights workers who testify before foreign bodies, or academics based abroad.',
    usedAgainst: ['Diaspora journalists', 'Academics', 'Human rights workers', 'Civil society leaders'],
    examples: [
      {
        description: 'Journalists who gave testimony to US Congressional bodies or European Parliament committees about press freedom in India were described as "Western stooges" in pro-government media.',
        date: '2022-2023',
      },
    ],
    country: 'India',
  },

  /* ── EXTREMISM ──────────────────────────────────────────────── */
  {
    id: 'extr-01',
    code: 'EXT-01',
    shortLabel: 'URBAN NAXAL',
    fullLabel: 'Urban Naxal',
    category: 'EXTREMISM',
    definition: 'A label coined to suggest that urban professionals (lawyers, academics, journalists, activists) are the ideological and logistical support base for Maoist insurgents. Used to justify UAPA (Unlawful Activities Prevention Act) arrests of civil rights workers.',
    usedAgainst: ['Civil rights lawyers', 'Academics', 'Human rights activists', 'Documentary filmmakers'],
    examples: [
      {
        description: 'The Bhima Koregaon case saw 16 activists, academics, and lawyers (including Sudha Bharadwaj, Varavara Rao, Stan Swamy) arrested under UAPA. Police described them as "urban Naxals."',
        target: 'Bhima Koregaon 16 (BK-16)',
        date: '2018-2020',
        url: 'https://thewire.in',
      },
      {
        description: 'Author Vivek Agnihotri\'s film "Buddha in a Traffic Jam" (2016) popularized the "Urban Naxal" term. The film depicted urban intellectuals as Maoist conspirators.',
        date: '2016',
      },
    ],
    country: 'India',
  },

  {
    id: 'extr-02',
    code: 'EXT-02',
    shortLabel: 'KHALISTANI',
    fullLabel: 'Khalistani',
    category: 'EXTREMISM',
    definition: 'Applied to Sikhs or Punjabi individuals associated with a demand for a separate Sikh homeland. Massively expanded during the 2020-21 farmers\' protests to apply to all Sikh protesters, regardless of their actual political stance.',
    usedAgainst: ['Sikh protesters', 'Farmers\' movement leaders', 'Punjabi activists', 'Diaspora Sikhs'],
    examples: [
      {
        description: 'BJP leaders and aligned media extensively described the farmers\' protests (largely Punjabi Sikh farmers) as a "Khalistani movement," despite leaders explicitly rejecting separatism.',
        speaker: 'Multiple BJP leaders and TV anchors',
        target: 'Farmers\' movement',
        date: '2020-12 to 2021-11',
      },
      {
        description: 'Protests in Canada and UK by Sikh diaspora were described by Indian officials as "Khalistani rallies," triggering diplomatic incidents.',
        date: '2023',
      },
    ],
    country: 'India',
  },

  {
    id: 'extr-03',
    code: 'EXT-03',
    shortLabel: 'MAOIST',
    fullLabel: 'Maoist',
    category: 'EXTREMISM',
    definition: 'Originally referring to adherents of Maoist communist ideology, the term is now used loosely against civil society workers, tribals, and activists who advocate for marginalized communities, regardless of actual ideology.',
    usedAgainst: ['Tribal rights workers', 'Activists', 'Civil society', 'Left-leaning academics'],
    examples: [
      {
        description: 'Tribal rights activists in Chhattisgarh working with Adivasi communities have been labelled Maoists and arrested under UAPA without established connection to armed groups.',
        date: '2010-2023',
      },
    ],
    country: 'India',
  },

  {
    id: 'extr-04',
    code: 'EXT-04',
    shortLabel: 'TERRORIST',
    fullLabel: 'Terrorist / Terrorist Sympathizer',
    category: 'EXTREMISM',
    definition: 'Applied to protesters, activists, and civil rights lawyers who advocate for those accused under anti-terror laws. The label is used to conflate legal defense with support for terrorism.',
    usedAgainst: ['Civil rights lawyers', 'Human rights activists', 'Muslim protesters'],
    examples: [
      {
        description: 'Lawyers defending UAPA accused have been described in TV debates as "terrorist sympathizers."',
        date: '2018-2023',
      },
    ],
    country: 'India',
  },

  {
    id: 'extr-05',
    code: 'EXT-05',
    shortLabel: 'SEPARATIST',
    fullLabel: 'Separatist',
    category: 'EXTREMISM',
    definition: 'Implies the target seeks to break India apart. Applied to Kashmiri journalists and activists, and more broadly to anyone supporting cultural or political autonomy for minorities.',
    usedAgainst: ['Kashmiri activists', 'Journalists reporting on Kashmir', 'Minority rights advocates'],
    examples: [
      {
        description: 'Kashmiri journalist Fahad Shah was arrested under UAPA and described by police as a "separatist." He was reporting on conflict-related issues.',
        target: 'Fahad Shah (Kashmir Walla)',
        date: '2022',
        url: 'https://thewire.in',
      },
    ],
    country: 'India',
  },

  /* ── RELIGION ───────────────────────────────────────────────── */
  {
    id: 'rel-01',
    code: 'REL-01',
    shortLabel: 'JIHADI',
    fullLabel: 'Jihadi',
    category: 'RELIGION',
    definition: 'Applied to Muslim protesters, activists, or critics to imply religious militancy. Used extensively during the CAA protests (2019-20) against Muslim demonstrators at Shaheen Bagh and other sites, even when protests were explicitly non-violent.',
    usedAgainst: ['Muslim protesters', 'CAA activists', 'Muslim journalists', 'Muslim civil society'],
    examples: [
      {
        description: 'BJP leader Anurag Thakur used the phrase "Desh ke Gaddaron ko, Goli Maaro Saalon ko" ("Shoot the traitors of the country") at a rally in Delhi, which was seen as directed at Muslim CAA protesters described as jihadis in the vicinity.',
        speaker: 'Anurag Thakur (BJP, now Union Minister)',
        date: '2020-01',
        url: 'https://thewire.in',
      },
      {
        description: 'Shaheen Bagh protesters were described as "jihadis" and "anti-nationals" in multiple prime-time TV debates on pro-government channels.',
        target: 'Shaheen Bagh protesters',
        date: '2019-12 to 2020-03',
      },
    ],
    country: 'India',
  },

  {
    id: 'rel-02',
    code: 'REL-02',
    shortLabel: 'ANTI HINDU',
    fullLabel: 'Anti-Hindu',
    category: 'RELIGION',
    definition: 'Reframes any criticism of Hindu nationalist politics or majoritarianism as an attack on the Hindu religion or community as a whole. Used to silence criticism of Hindutva ideology by equating ideology with faith.',
    usedAgainst: ['Secular journalists', 'Opposition politicians', 'Liberal academics', 'Critics of Hindutva'],
    examples: [
      {
        description: 'Multiple journalists who reported on communal violence or religious polarization were labelled "anti-Hindu" in campaigns coordinated on social media and echoed by TV anchors.',
        date: '2019-2023',
      },
    ],
    country: 'India',
  },

  {
    id: 'rel-03',
    code: 'REL-03',
    shortLabel: 'APPEASER',
    fullLabel: 'Appeaser / Muslim Appeaser',
    category: 'RELIGION',
    definition: 'A longstanding pejorative alleging that politicians or parties prioritize Muslim interests over the majority. Used by BJP and Hindu nationalist groups since the 1990s to undermine secular governance as demographic "appeasement."',
    usedAgainst: ['Congress politicians', 'Secular leaders', 'Opposition parties', 'Muslim rights advocates'],
    examples: [
      {
        description: 'The label has been used by PM Modi in election speeches: "Congress does appeasement politics" is a recurring campaign theme since 2014.',
        speaker: 'Narendra Modi (BJP, PM)',
        date: '2014, 2019, 2024',
      },
    ],
    country: 'India',
  },

  {
    id: 'rel-04',
    code: 'REL-04',
    shortLabel: 'PSEUDO SECULAR',
    fullLabel: 'Pseudo-Secular',
    category: 'RELIGION',
    definition: 'Coined by L.K. Advani in the 1990s, the term implies that secularism as practiced in India is hypocritical, favouring minority religious expression while suppressing Hindu expression. Now a standard label to dismiss any secular political argument.',
    usedAgainst: ['Congress', 'Secular liberals', 'Journalists', 'Academics'],
    examples: [
      {
        description: 'The term was coined by L.K. Advani to critique the Congress party\'s approach to religious minorities. It has since become standard BJP campaign rhetoric.',
        speaker: 'L.K. Advani (BJP)',
        date: '1990s-ongoing',
      },
    ],
    country: 'India',
  },

  /* ── MEDIA / IDEOLOGY ───────────────────────────────────────── */
  {
    id: 'med-01',
    code: 'MED-01',
    shortLabel: 'DIMAGI NAXAL',
    fullLabel: 'Dimagi Naxal',
    category: 'EXTREMISM',
    definition: 'A pejorative term used by government representatives and state-aligned media to label intellectual protesters, students, and writers whose ideas are accused of subverting national security.',
    usedAgainst: ['Student leaders', 'Intellectuals', 'Academics', 'Protesters'],
    examples: [
      {
        description: 'Used extensively by commentators and spokespersons to describe students and activists participating in the July 2026 protests.',
        speaker: 'Government spokespersons and aligned media',
        date: '2026-07',
      },
    ],
    country: 'India',
  },

  {
    id: 'med-02',
    code: 'MED-02',
    shortLabel: 'FAKE NEWS',
    fullLabel: 'Fake News',
    category: 'MEDIA',
    definition: 'Deployed against independent media, fact-checkers, and critical reporting. While "fake news" as a phenomenon is real, the label is used by government-aligned voices to preemptively discredit any unfavourable coverage.',
    usedAgainst: ['Independent media outlets', 'Fact-checking organizations', 'Digital news portals'],
    examples: [
      {
        description: 'The Wire, The Quint, Alt News, and similar independent outlets are routinely called "fake news" in pro-government social media.',
        date: '2016-ongoing',
      },
      {
        description: 'IT Ministry proposed "Fact Check Units" to adjudicate "fake news" about the government, raising press freedom concerns as it gave the state power to label journalism as fake.',
        date: '2023',
        url: 'https://internetfreedom.in',
      },
    ],
    country: 'India',
  },

  {
    id: 'med-03',
    code: 'MED-03',
    shortLabel: 'ECOSYSTEM',
    fullLabel: 'The Ecosystem',
    category: 'MEDIA',
    definition: 'A conspiratorial frame suggesting a coordinated network of journalists, academics, lawyers, and activists working together to undermine the state. The "ecosystem" framing treats independent professional activity as organized conspiracy.',
    usedAgainst: ['Civil society writ large', 'Journalists', 'Lawyers', 'Academics', 'Activists'],
    examples: [
      {
        description: '"Breaking the ecosystem" is a phrase used by some right-wing media personalities and BJP sympathizers to describe the goal of dismantling the perceived network of liberal critics.',
        date: '2019-ongoing',
      },
    ],
    country: 'India',
  },

  {
    id: 'med-04',
    code: 'MED-04',
    shortLabel: 'LEFT LIBERAL',
    fullLabel: 'Left-Liberal',
    category: 'MEDIA',
    definition: 'Used as a pejorative to dismiss progressive, human rights-oriented voices. The label implies ideological bias without engaging the substance of the argument. Often prefixed with "so-called" to add dismissiveness.',
    usedAgainst: ['Academics', 'Journalists', 'Civil society', 'Opposition figures'],
    examples: [
      {
        description: 'Standard dismissive label across right-wing TV debates when discussing critics of government policy on minority rights, land acquisition, or press freedom.',
        date: 'Ongoing',
      },
    ],
    country: 'India',
  },

  {
    id: 'med-05',
    code: 'MED-05',
    shortLabel: 'PROPAGANDIST',
    fullLabel: 'Propagandist',
    category: 'MEDIA',
    definition: 'Applied to journalists and publications that produce critical coverage, implying their reporting is politically motivated propaganda rather than journalism. Mirrors the actual definition of propaganda broadcasting associated with government-aligned media.',
    usedAgainst: ['Journalists', 'Independent media', 'Documentary filmmakers'],
    examples: [
      {
        description: 'The BBC documentary "India: The Modi Question" (2023) was banned from streaming in India. Officials called it "propaganda" and "a colonial mindset at play."',
        speaker: 'MEA spokesperson',
        target: 'BBC',
        date: '2023-01',
      },
    ],
    country: 'India',
  },

  /* ── CLASS / ELITE ──────────────────────────────────────────── */
  {
    id: 'cls-01',
    code: 'CLS-01',
    shortLabel: 'ANDOLAN JEEVI',
    fullLabel: 'Andolanjeevi (Professional Protester)',
    category: 'CLASS',
    definition: 'Coined by PM Narendra Modi in the Rajya Sabha, February 2021. Implies the target is a "professional" agitator who protests for money rather than genuine grievance. Used to delegitimize sustained protest movements by portraying participants as mercenaries rather than citizens.',
    usedAgainst: ['Farmers\' movement', 'Long-term activists', 'Student protesters', 'Environmental activists'],
    examples: [
      {
        description: 'PM Modi used the term "Andolanjeevi" during a parliamentary speech about the farmers\' protests, distinguishing between "genuine" protesters and supposed professional agitators.',
        speaker: 'Narendra Modi (PM)',
        date: '2021-02',
        url: 'https://scroll.in',
      },
    ],
    country: 'India',
  },

  {
    id: 'cls-02',
    code: 'CLS-02',
    shortLabel: 'LUTYENS GANG',
    fullLabel: 'Lutyens Gang / Lutyens Media',
    category: 'CLASS',
    definition: 'Refers to the Delhi elite and English-language media centered around Lutyens\' Delhi. Used to dismiss criticism as the preoccupation of entrenched establishment insiders who lost political relevance. Became a standard label for English-language journalism after 2014.',
    usedAgainst: ['English-language journalists', 'Old Delhi elite', 'Opposition-aligned commentators', 'Former civil servants'],
    examples: [
      {
        description: 'The term "Lutyens media" is used routinely by BJP spokespeople and pro-government social media to dismiss The Hindu, Indian Express, NDTV, and similar publications.',
        date: '2014-ongoing',
      },
    ],
    country: 'India',
  },

  {
    id: 'cls-03',
    code: 'CLS-03',
    shortLabel: 'KHAN MARKET GANG',
    fullLabel: 'Khan Market Gang',
    category: 'CLASS',
    definition: 'A label for urban liberal critics who frequent Khan Market (a market in Delhi associated with elite consumption). Implies the targets are disconnected cosmopolitan elites with no understanding of "real India." Popularized by BJP politician Subramanian Swamy.',
    usedAgainst: ['Urban intellectuals', 'Liberal journalists', 'NGO workers', 'Delhi-based academics'],
    examples: [
      {
        description: 'PM Modi mentioned the "Khan Market gang" in election speeches, contrasting it with ordinary voters. The term became a campaign staple.',
        speaker: 'Narendra Modi (PM)',
        date: '2019-2024',
      },
      {
        description: 'Subramanian Swamy (BJP) regularly used the term on social media to ridicule critics. The phrase has entered mainstream political vocabulary.',
        speaker: 'Subramanian Swamy (BJP)',
        date: '2018-ongoing',
      },
    ],
    country: 'India',
  },

  {
    id: 'cls-04',
    code: 'CLS-04',
    shortLabel: 'URBAN ELITE',
    fullLabel: 'Urban Elite',
    category: 'CLASS',
    definition: 'Used to dismiss critics as privileged city-dwellers disconnected from the "real" concerns of rural India. Applied to neutralize criticism from educated, internationally visible observers.',
    usedAgainst: ['Academics', 'Journalists', 'Tech sector voices', 'Activists based in metros'],
    examples: [
      {
        description: 'Criticism of the farming laws was dismissed by some ministers as "urban elite who don\'t understand agriculture."',
        date: '2020-21',
      },
    ],
    country: 'India',
  },

  /* ── ADDITIONAL LABELS (master pool for shuffle variety) ─────── */
  {
    id: 'extr-06',
    code: 'EXT-06',
    shortLabel: 'NAXAL',
    fullLabel: 'Naxal',
    category: 'EXTREMISM',
    definition: 'Originally referring to the Naxalbari uprising participants (1967) and subsequent Maoist armed movement in India. Now used loosely against tribals, civil society workers, and any left-leaning activist in conflict-affected regions.',
    usedAgainst: ['Tribal rights workers', 'Activists in Chhattisgarh/Jharkhand', 'Left-leaning academics'],
    examples: [
      {
        description: 'Human rights lawyers visiting Adivasi communities in Chhattisgarh have been arrested and labelled Naxal sympathizers.',
        date: '2010-2023',
      },
    ],
    country: 'India',
  },

  {
    id: 'rel-05',
    code: 'REL-05',
    shortLabel: 'MINORITY APPEASEMENT',
    fullLabel: 'Minority Appeasement',
    category: 'RELIGION',
    definition: 'The framing that any policy benefiting religious minorities constitutes illegitimate "appeasement" rather than governance. Used to make constitutional protections for minorities seem like political corruption.',
    usedAgainst: ['Congress party', 'Secular voices', 'Rights-based organizations'],
    examples: [
      {
        description: 'Standard BJP campaign phrase across multiple election cycles. Used to criticize waqf board protections, scholarship programs, and minority welfare schemes.',
        date: '2014-2024',
      },
    ],
    country: 'India',
  },

  {
    id: 'med-06',
    code: 'MED-06',
    shortLabel: 'WOKE BRIGADE',
    fullLabel: 'Woke Brigade',
    category: 'MEDIA',
    definition: 'An imported label from US culture-war discourse, applied to progressive youth, campus activists, and intersectional rights advocates. Implies the target is following imported Western trends rather than engaging with genuine Indian concerns.',
    usedAgainst: ['Student activists', 'Progressive youth', 'LGBTQ+ advocates', 'Feminist critics'],
    examples: [
      {
        description: 'Used across right-wing social media and some TV channels to dismiss progressive campus politics and online activism.',
        date: '2020-ongoing',
      },
    ],
    country: 'India',
  },

  {
    id: 'nat-06',
    code: 'NAT-06',
    shortLabel: 'FIFTH COLUMN',
    fullLabel: 'Fifth Column',
    category: 'NATIONALISM',
    definition: 'A Cold War-era term for a clandestine group working to undermine a country from within. Applied to journalists, academics, and civil society members to suggest organized subversion.',
    usedAgainst: ['Journalists', 'Academics', 'Civil society figures'],
    examples: [
      {
        description: 'Used in television debates and social media to characterize journalists who report on government failures as internal saboteurs.',
        date: '2016-ongoing',
      },
    ],
    country: 'India',
  },

  {
    id: 'frng-08',
    code: 'FRG-08',
    shortLabel: 'FOREIGN FUNDED',
    fullLabel: 'Foreign-Funded',
    category: 'FOREIGN',
    definition: 'A label implying any foreign funding source—foundation grants, international research fellowships—represents control or corruption. Used extensively to justify FCRA cancellations against civil society organizations.',
    usedAgainst: ['NGOs', 'Research institutes', 'Human rights organizations', 'Media groups'],
    examples: [
      {
        description: 'Over 6,000 NGOs had FCRA registrations cancelled between 2014 and 2022, often with "foreign-funded anti-national activities" cited.',
        date: '2014-2022',
        url: 'https://economictimes.indiatimes.com',
      },
    ],
    country: 'India',
  },

  {
    id: 'cls-05',
    code: 'CLS-05',
    shortLabel: 'COCKROACHES',
    fullLabel: 'Cockroaches',
    category: 'NATIONALISM',
    definition: 'Dehumanizing language used by politicians and media to describe student protesters or demonstrators, comparing them to pests that disrupt social order and need to be cleaned out.',
    usedAgainst: ['Protesters', 'Student demonstrators', 'Activists'],
    examples: [
      {
        description: 'Used by state media and aligned commentators to describe individuals participating in the July 2026 street rallies.',
        speaker: 'Political commentators and state-backed media',
        date: '2026-07',
      },
    ],
    country: 'India',
  },

  {
    id: 'extr-07',
    code: 'EXT-07',
    shortLabel: 'EXTREMIST',
    fullLabel: 'Extremist',
    category: 'EXTREMISM',
    definition: 'Generic catch-all applied when "terrorist," "Naxal," or "Maoist" labels cannot be substantiated. Deliberately vague to be legally defensible while still delegitimizing the target.',
    usedAgainst: ['Protest leaders', 'Civil society', 'Religious minorities'],
    examples: [
      {
        description: 'Protest organizers in multiple states have been described as "extremist elements" in police FIRs without specific accusations.',
        date: '2019-2023',
      },
    ],
    country: 'India',
  },

  {
    id: 'med-07',
    code: 'MED-07',
    shortLabel: 'COMMUNIST',
    fullLabel: 'Communist',
    category: 'MEDIA',
    definition: 'A Cold War–era ideological pejorative applied to any left-leaning critic. In contemporary India, used to dismiss progressive policy positions, labour rights advocacy, and civil liberties arguments.',
    usedAgainst: ['Left-leaning academics', 'Labour activists', 'Progressive journalists'],
    examples: [
      {
        description: 'Critics of economic liberalization policies or proponents of social welfare spending are routinely labelled "communists" on right-wing social media.',
        date: 'Ongoing',
      },
    ],
    country: 'India',
  },

  {
    id: 'med-08',
    code: 'MED-08',
    shortLabel: 'FRANDS',
    fullLabel: 'Frands',
    category: 'MEDIA',
    definition: 'Prime Minister Modi\'s pronunciation of "friends", used sarcastically to address critics and opponents. The term has been adopted ironically to mock the condescending tone of political outreach to those being simultaneously targeted.',
    usedAgainst: ['Political opponents', 'Critics', 'Protesters'],
    examples: [
      {
        description: 'Modi frequently addresses crowds, including those sceptical of his government, as "my frands", a pronunciation that became a viral meme symbolising the gap between political rhetoric and policy.',
        speaker: 'PM Narendra Modi',
        date: 'Recurring',
      },
    ],
    country: 'India',
  },
];

/* ─────────────────────────────────────────────────────────────
   Initial 25 curated labels for the default card
   Balanced across categories, India-focused
   ───────────────────────────────────────────────────────────── */
export const DEFAULT_25_LABEL_IDS = [
  'nat-01', // ANTI-NATIONAL
  'nat-02', // DESH DROHI
  'nat-03', // TUKDE-TUKDE
  'nat-04', // ANTI-INDIA
  'nat-05', // SEDITIOUS
  'frng-01',// FOREIGN AGENT
  'frng-02',// SOROS-FUNDED
  'frng-03',// PAKISTAN-BACKED
  'frng-04',// TOOLKIT GANG
  'frng-05',// ISI AGENT
  'extr-01',// URBAN NAXAL
  'extr-02',// KHALISTANI
  'extr-03',// MAOIST
  'extr-04',// TERRORIST
  'extr-05',// SEPARATIST
  'rel-01', // JIHADI
  'rel-02', // ANTI-HINDU
  'rel-03', // APPEASER
  'rel-04', // PSEUDO-SECULAR
  'med-01', // DIMAGI NAXAL
  'med-02', // FAKE NEWS
  'med-03', // ECOSYSTEM
  'med-04', // LEFT-LIBERAL
  'med-08', // FRANDS
  'cls-01', // ANDOLANJEEVI
];
