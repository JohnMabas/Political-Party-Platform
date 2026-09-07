// The mock "store" — a single source of truth for the campaign operation.
// In production each of these would resolve to service/API calls; here it is
// in-memory so that one role's action is reflected across every other view.



export const ELECTION_DATE = new Date('2027-02-20T00:00:00')
export const CYCLE_GOAL = 50000000

export const platformIssues = [
  {
    slug: 'energy',
    title: 'Power & Infrastructure',
    summary: 'Reliable electricity, better roads, and nationwide digital connectivity that work for every Nigerian.',
    position: 'We believe a developed Nigeria starts with power and infrastructure that work. Our position is to reform and expand the national grid, invest in reliable generating capacity, and extend electrification to every LGA. We support graded and rebuilt federal and state roads, rail and mass-transit investment, and nationwide broadband so rural communities are connected to the national economy. We will prioritise public-private discipline and transparency in every project.',
    facts: [
      'The national grid has experienced repeated partial collapses in recent years, disrupting homes and businesses.',
      'A majority of Nigerians still rely on self-generated power because of unreliable grid supply.',
      'Over 40% of rural communities remain without reliable access to electricity.',
    ],
    headline: 'A Nigeria that keeps the lights on.',
    relatedNews: ['FUP launches nationwide grid-stability town halls', 'Senate committee reviews power-sector reform bill'],
  },
  {
    slug: 'education',
    title: 'Education & Youth',
    summary: 'Quality schools, funded classrooms, and skills and jobs for the largest young population in Africa.',
    position: 'We support a fully-funded education system from primary through tertiary, with better pay and training for teachers, safe and equipped school buildings, and free and compulsory basic education for every child. We believe youth are Nigeria\u2019s greatest asset: we will expand technical and vocational training, support the digital-economy workforce, and ensure opportunities to learn, earn, and lead.',
    facts: [
      'Nigeria has one of the largest youth populations in the world, yet youth unemployment remains stubbornly high.',
      'Millions of children of primary-school age are still out of school.',
      'Investment in technical and vocational education remains well below what the economy needs.',
    ],
    headline: 'Educate, equip, and employ our youth.',
    relatedNews: ['FUP proposes vocational-centres plan for every senatorial district', 'A new basic-education fund clears first reading'],
  },
  {
    slug: 'health',
    title: 'Healthcare',
    summary: 'Affordable, accessible health services and a stronger primary healthcare system for every family.',
    position: 'We believe access to quality healthcare is a right, not a privilege. We support a strengthened and properly funded primary healthcare system in every ward, expanded health insurance coverage through the National Health Insurance scheme, and better pay and protection for health workers so they stay and serve. We will invest in teaching hospitals, maternal and child health, and disease prevention and emergency response.',
    facts: [
      'A large share of Nigerians pay for healthcare out of pocket, pushing families into hardship.',
      'Rural wards often lack a functioning primary health centre close to home.',
      'Healthcare worker shortages strain hospitals and clinics nationwide.',
    ],
    headline: 'Quality care for every Nigerian family.',
    relatedNews: ['Health-insurance expansion bill reaches the floor', 'FUP hosts primary-healthcare listening tour in the South-East'],
  },
  {
    slug: 'security',
    title: 'Security & Unity',
    summary: 'A safer Nigeria through capable, accountable security services and investment in the community cohesion that prevents conflict.',
    position: 'We believe security and national unity are two sides of the same coin. We support well-trained, well-equipped, and accountable security forces; stronger community policing; and investment in intelligence, technology, and local cooperation. We are committed to the equitable, inclusive growth that deprives crime and insurgency of their fuel, and to dialogue and justice that heal division and keep Nigeria one.',
    facts: [
      'Security challenges across several regions continue to strain the economy and national unity.',
      'Community-based approaches have proven effective where residents and security services cooperate.',
      'Underfunding and gaps in the security sector undermine public confidence.',
    ],
    headline: 'One Nigeria, safe and at peace.',
    relatedNews: ['FUP supports community-policing framework nationwide', 'Unity & security summit brings leaders from all 36 states'],
  },
  {
    slug: 'economy',
    title: 'Economic Development',
    summary: 'Diversify the economy, grow SMEs, support agriculture, and create dignified jobs for Nigerians.',
    position: 'We support moving Nigeria beyond dependence on oil to a diversified economy built on agriculture, manufacturing, and services. Our position includes accessible credit and markets for small and medium enterprises, support for farmers and agro-processing, responsible oil-and-gas management that recovers value for Nigerians, and a fair exchange-rate and fiscal strategy that stabilises prices and protects household incomes.',
    facts: [
      'Agriculture and SMEs are the backbone of household livelihoods but remain under-capitalised.',
      'Economic diversification away from oil has progressed slowly for decades.',
      'Affordable credit for small businesses remains scarce outside major cities.',
    ],
    headline: 'An economy that works for the many, not the few.',
    relatedNews: ['FUP SME credit scheme expands to six states', 'Agricultural cluster programme breaks ground in the North-Central'],
  },
  {
    slug: 'governance',
    title: 'Anti-Corruption & Good Governance',
    summary: 'Transparent, accountable, and efficient government that serves the people and builds trust.',
    position: 'We believe power must be accountable to the people. We support a stronger, independent anti-corruption framework; transparent budgeting and public procurement; protection for whistle-blowers; electoral reform that strengthens voter confidence; and devolution of more authority and resources to states and LGAs so government is closer to the people it serves. We will lead by example — running clean, transparent, and law-abiding campaigns.',
    facts: [
      'Public trust in government institutions remains low across much of the country.',
      'Transparent procurement and open budgeting reduce waste and abuse.',
      'Electoral reform is essential to free, fair, and credible elections.',
    ],
    headline: 'Government you can trust.',
    relatedNews: ['FUP tables open-budget bill for public comment', 'Electoral reform working group issues roadmap'],
  },
]

export const candidates = [
  {
    slug: 'wasiu-sanni',
    name: 'Sen. Wasiu Eshilokun Sanni',
    race: 'Senate — Lagos Central Senatorial District',
    photo: '/candidates/wasiu-sanni.jpg',
    tagline: 'A seasoned legislator fighting for steady power, better transport, and the blue economy.',
    bio: 'Senator Wasiu Eshilokun Sanni is an agricultural economist who has represented Lagos Central in the 10th National Assembly since 2023. He served two stints in the Lagos State House of Assembly (1999–2003 and 2015–2023), rising to Deputy Speaker, and chairs the Senate Committee on Marine Transport. He is running again to deliver steady power, modern transport, and real opportunities for Lagos.\n\nHe holds a B.Sc. in Agricultural Economics (Olabisi Onabanjo University), a Master\u2019s in International Law and Diplomacy (University of Lagos), and leadership certificates from Harvard Law School and the Harvard Kennedy School.',
    endorsements: ['Lagos Chamber of Commerce', 'League of Market Women (Lagos)', 'National Association of Polytechnic Students'],
    events: ['FUP Unity Rally — Lagos Mainland', 'Ikeja Infrastructure Town Hall'],
    donateLink: true,
  },
  {
    slug: 'chimaobi-atu',
    name: 'Hon. Chimaobi Sam Atu',
    race: 'House of Representatives — Enugu North/Enugu South Federal Constituency',
    photo: '/candidates/chimaobi-atu.jpg',
    tagline: 'A real estate developer and lawmaker championing schools, skills, and jobs at home.',
    bio: 'Hon. Chimaobi Sam Atu (born 2 April 1982, in Umumba Ndiaga Ugwuaji, Enugu South) is a Nigerian politician and real estate developer representing Enugu North/Enugu South in the House of Representatives since 2023. A graduate of Enugu State University of Science and Technology, he has used his time in the Green Chamber to push education funding, teacher welfare, and technology hubs that connect young Nigerians to the digital economy. He is running again to deepen school investment and bring real jobs home to the South-East.\n\nAn entrepreneur before entering politics, he brings a builder\u2019s discipline to governance — matching every promise with projects people can see and use.',
    endorsements: ['National Union of Teachers (Enugu)', 'South-East Youth Assembly', 'Enugu Traders Association'],
    events: ['Enugu Youth & Skills Forum', 'Enugu North/South Constituency Town Hall'],
    donateLink: true,
  },
  {
    slug: 'ismaila-falgore',
    name: 'Rt. Hon. Ismaila Jibrin Falgore',
    race: 'Kano South — State Assembly',
    photo: '/candidates/ismaila-falgore.jpg',
    tagline: 'Speaker championing agriculture, small business, and youth opportunity for Kano South.',
    bio: 'Rt. Hon. Ismaila Jibrin Falgore is the Speaker of the Kano State House of Assembly, elected to the position in June 2023, and represents Roggo Constituency in the Kano South senatorial district. His leadership has championed legislation on agriculture, small business, and youth empowerment, with an emphasis on grassroots consultation and accountability.\n\nKnown for an open-door approach, he has made the Assembly a platform for farming and trading communities to shape the laws that affect them — and he is committed to carrying that service to every ward of Kano South.',
    endorsements: ['Kano Farmers Association', 'Kano Business Community', 'Jam\u2019iyyar Matan Arewa (Women\u2019s League)'],
    events: ['FUP Community Dialogue — Kano South', 'Agriculture & Youth Employment Forum'],
    donateLink: true,
  },
  {
    slug: 'allwell-ihunda',
    name: 'Sir Allwell Ihunda',
    race: 'Local Government Chairman — Port Harcourt, Rivers State',
    photo: '/candidates/allwell-ihunda.jpg',
    tagline: 'A grassroots administrator bringing visible projects and clean services to the city.',
    bio: 'Sir Allwell Ihunda DSSRS (JP) is the Mayor (Executive Chairman) of Port Harcourt City Local Government Area. Born on 26 May 1964 in Orogbum Community, Rebisi, Port Harcourt, he rose from teacher to one of Nigeria\u2019s most project-focused council administrators — building health centres, the Port Harcourt Digital Tools Mall, water projects, and a skills-acquisition drive that has trained thousands.\n\nHis administration runs on three things: transparent books, visible infrastructure, and empowerment for ordinary residents. He is committed to keeping Port Harcourt clean, connected, and working for everyone — ward by ward.',
    endorsements: ['Port Harcourt Market Union', 'Garden City Traders Association', 'Rivers Community Development Coalition'],
    events: ['FUP Ward Rally — Port Harcourt', 'Drainage & Roads Accountability Session'],
    donateLink: true,
  },
]

export const events = [
  { id: 1, title: 'FUP Unity Rally — Lagos Mainland', type: 'Rally', date: '2026-09-19T09:00:00', location: 'Tafawa Balewa Square, Lagos Island', address: 'Tafawa Balewa Square, Lagos Island', description: 'Join us for a major rally to launch the campaign season. We\u2019ll hear from candidates, enjoy music, and energise supporters across Lagos. Free and open to all.', capacity: 2000, rsvps: 1410, host: 'FUP National Secretariat', attendees: [1, 2] },
  { id: 2, title: 'Ikeja Infrastructure Town Hall', type: 'Town Hall', date: '2026-09-24T18:30:00', location: 'Ikeja Club House, Ikeja', address: '2 Obafemi Awolowo Way, Ikeja', description: 'An open town hall with Senator Wasiu Eshilokun Sanni on power, roads, and drainage in Lagos. Bring your questions and your neighbours. Light refreshments provided.', capacity: 300, rsvps: 212, host: 'Lagos Campaign Office', attendees: [1] },
  { id: 3, title: 'Phone Bank for PVC Holders', type: 'Phone Bank', date: '2026-09-28T17:30:00', location: 'FUP Lagos Office, Surulere', address: '18 Adeniran Ogunsanya St, Surulere', description: 'Call registered PVC holders to confirm their polling units and encourage them to vote. Training provided — bring a phone and a charger.', capacity: 50, rsvps: 31, host: 'Outreach Team', attendees: [2] },
  { id: 4, title: 'Enugu Youth & Skills Forum', type: 'Forum', date: '2026-10-02T11:00:00', location: 'Enugu State Library Hall', address: '5 Okpara Ave, Enugu', description: 'A listening forum with Hon. Chimaobi Sam Atu on education, skills, and jobs for the South-East. Students, teachers, and parents all welcome.', capacity: 200, rsvps: 148, host: 'Enugu Campaign Office', attendees: [] },
  { id: 5, title: 'FUP Community Dialogue — Kano South', type: 'Town Hall', date: '2026-10-08T15:00:00', location: 'Kano South Civic Centre, Dala', address: 'Dala Road, Kano', description: 'An afternoon dialogue with Rt. Hon. Ismaila Jibrin Falgore on agriculture, credit, and youth opportunity in Kano South.', capacity: 250, rsvps: 160, host: 'Kano Campaign Office', attendees: [3] },
  { id: 6, title: 'FUP Ward Rally — Port Harcourt', type: 'Rally', date: '2026-10-11T09:30:00', location: 'Port Harcourt Pleasure Park', address: 'Abuloma Rd, Port Harcourt', description: 'A ward rally with Sir Allwell Ihunda on clean grassroots governance and visible projects.', capacity: 1000, rsvps: 640, host: 'Rivers Campaign Office', attendees: [] },
  { id: 7, title: 'National Get-Out-the-Vote Rally', type: 'Rally', date: '2027-02-18T13:00:00', location: 'National Stadium, Abuja', address: 'National Stadium, Abuja FCT', description: 'Our closing rally of the cycle with all candidates, live music, and a final push to get Nigerians to the polls. Free and open to all.', capacity: 5000, rsvps: 3900, host: 'FUP National Secretariat', attendees: [] },
  { id: 8, title: 'Enugu North/South Constituency Town Hall', type: 'Town Hall', date: '2026-10-16T16:00:00', location: 'Enugu Civic Centre', address: 'Independent Layout, Enugu', description: 'A town hall with Hon. Chimaobi Sam Atu on education funding, teacher welfare, and youth skills in the Enugu North/Enugu South federal constituency.', capacity: 220, rsvps: 96, host: 'Enugu Campaign Office', attendees: [] },
  { id: 9, title: 'Agriculture & Youth Employment Forum', type: 'Forum', date: '2026-10-24T10:00:00', location: 'Kano South Civic Centre, Dala', address: 'Dala Road, Kano', description: 'A forum with Rt. Hon. Ismaila Jibrin Falgore on farm credit, agro-processing, and jobs for young people in Kano South.', capacity: 180, rsvps: 121, host: 'Kano Campaign Office', attendees: [] },
  { id: 10, title: 'Drainage & Roads Accountability Session', type: 'Town Hall', date: '2026-11-06T10:30:00', location: 'Port Harcourt Pleasure Park', address: 'Abuloma Rd, Port Harcourt', description: 'An accountability session with Sir Allwell Ihunda on open books and visible drainage and road projects.', capacity: 150, rsvps: 74, host: 'Rivers Campaign Office', attendees: [] },
]

export const news = [
  { id: 1, title: 'FUP kicks off PVC mobilization drive with weekend blitz across six states', date: '2026-09-02', category: 'Press Release', excerpt: 'Volunteers will reach thousands of PVC holders in Lagos, Kano, Enugu, and beyond this weekend as the party shifts into the final stretch before the general election.', body: 'The Federal Unity Party announced a weekend mobilization blitz that will reach PVC holders across six states, kicking off the final phase of the cycle. Organizers said the effort pairs community intelligence gathered this year with new neighbourhood teams recruited at summer events.', author: 'FUP Press Office' },
  { id: 2, title: 'Our Story: five years of building a national movement, state by state', date: '2026-08-25', category: 'Blog', excerpt: 'From a handful of community meetings to a party present in all 36 states, a look at how the Federal Unity Party grew into a national organization.', body: 'Five years ago, a small group of citizens committed to a simple idea: that a political party can be built on service, transparency, and unity across every region of Nigeria. This month, the organization that grew from that idea counts members in all 36 states and the FCT, hundreds of local branches, and a slate of candidates at every level of government.', author: 'Communications Team' },
  { id: 3, title: 'New volunteer portal makes it easier to find a shift near you', date: '2026-08-18', category: 'Press Release', excerpt: 'Supporters can now sign up for canvass shifts, phone banks, and events from a single portal, with assignments synced to their calendar.', body: 'The party released a rebuilt volunteer portal that lets supporters claim shifts, log hours, and track their progress in one place. Organizers say the portal cut the average time from sign-up to a volunteer\u2019s first shift from nine days to two.', author: 'Digital Team' },
  { id: 4, title: 'Fundraising tops ₦35 million as small-dollar donors step up', date: '2026-08-10', category: 'Press Release', excerpt: 'The campaign crossed the ₦35 million mark in total fundraising, with the majority of contributions coming in small amounts from ordinary Nigerians.', body: 'The campaign announced it has raised more than ₦35 million this cycle, with the majority of contributions in small amounts. The average donation is about ₦5,000, reflecting a grassroots base that organizers say now includes supporters in every state of the federation.', author: 'Finance Team' },
]

export const endorsements = [
  { name: 'National Union of Teachers', type: 'Education', quote: 'Hon. Chimaobi Sam Atu has stood with teachers and students. We are proud to endorse him.' },
  { name: 'Lagos Chamber of Commerce', type: 'Business', quote: 'Senator Sanni understands infrastructure and jobs. A pragmatic candidate for a growing economy.' },
  { name: 'Kano Farmers Association', type: 'Agriculture', quote: 'Speaker Falgore has stood with our farmers and traders. We trust him to serve Kano South.' },
  { name: 'National Association of Women Engineers', type: 'Profession', quote: 'Sir Allwell Ihunda brings accountability and project discipline to grassroots governance.' },
  { name: 'South-East Youth Assembly', type: 'Community', quote: 'We endorse education and skills policies that give young Nigerians real opportunities.' },
  { name: 'National Good Governance Forum', type: 'Governance', quote: 'A platform committed to transparency and accountable government in every ward of Nigeria.' },
]

export const people = [
  { id: 1, name: 'Amina Yusuf', email: 'amina.yusuf@example.com', district: 'Lagos Island', roles: ['Volunteer', 'Donor', 'Supporter'], tags: ['canvasser', 'high-engagement'], donorStatus: 'Donor', volunteerStatus: 'Active', lastContact: '2026-09-04', totalGiven: 24000, doorsKnocked: 112, callsMade: 46, hours: 28, team: 1 },
  { id: 2, name: 'Tunde Bakare', email: 'tunde.bakare@example.com', district: 'Surulere', roles: ['Volunteer', 'Supporter'], tags: ['phone-banker'], donorStatus: 'Non-donor', volunteerStatus: 'Active', lastContact: '2026-09-03', totalGiven: 0, doorsKnocked: 18, callsMade: 102, hours: 19, team: 2 },
  { id: 3, name: 'Ngozi Eze', email: 'ngozi.eze@example.com', district: 'Enugu North', roles: ['Supporter', 'Donor'], tags: ['host', 'fundraiser'], donorStatus: 'Donor', volunteerStatus: 'Inactive', lastContact: '2026-08-29', totalGiven: 52000, doorsKnocked: 4, callsMade: 12, hours: 6, team: 1 },
  { id: 4, name: 'Ibrahim Salisu', email: 'ibrahim.salisu@example.com', district: 'Kano South', roles: ['Volunteer'], tags: ['canvasser', 'new'], donorStatus: 'Non-donor', volunteerStatus: 'Pending', lastContact: '2026-09-01', totalGiven: 0, doorsKnocked: 0, callsMade: 0, hours: 0, team: 3 },
  { id: 5, name: 'Chiamaka Okafor', email: 'chiamaka.o@example.com', district: 'Port Harcourt', roles: ['Supporter', 'Donor', 'Volunteer'], tags: ['ward-captain', 'host'], donorStatus: 'Recurring', volunteerStatus: 'Active', lastContact: '2026-09-05', totalGiven: 96000, doorsKnocked: 88, callsMade: 60, hours: 41, team: 1 },
  { id: 6, name: 'Yakubu Garba', email: 'yakubu.garba@example.com', district: 'Kaduna Central', roles: ['Donor'], tags: ['major-donor'], donorStatus: 'Recurring', volunteerStatus: 'Inactive', lastContact: '2026-08-20', totalGiven: 500000, doorsKnocked: 0, callsMade: 0, hours: 0, team: null },
  { id: 7, name: 'Grace Okonkwo', email: 'grace.okonkwo@example.com', district: 'Onitsha', roles: ['Volunteer', 'Supporter'], tags: ['phone-banker'], donorStatus: 'Donor', volunteerStatus: 'Active', lastContact: '2026-09-06', totalGiven: 8000, doorsKnocked: 31, callsMade: 140, hours: 34, team: 2 },
  { id: 8, name: 'Emeka Obi', email: 'emeka.obi@example.com', district: 'Enugu South', roles: ['Supporter'], tags: ['new'], donorStatus: 'Non-donor', volunteerStatus: 'Pending', lastContact: '2026-08-31', totalGiven: 0, doorsKnocked: 0, callsMade: 0, hours: 0, team: null },
  { id: 9, name: 'Fatima Bello', email: 'fatima.bello@example.com', district: 'Ikeja', roles: ['Donor', 'Volunteer'], tags: ['host', 'fundraiser'], donorStatus: 'Recurring', volunteerStatus: 'Active', lastContact: '2026-09-02', totalGiven: 76000, doorsKnocked: 54, callsMade: 33, hours: 22, team: 3 },
  { id: 10, name: 'Daniel Uche', email: 'daniel.uche@example.com', district: 'Aba', roles: ['Supporter'], tags: ['undecided'], donorStatus: 'Non-donor', volunteerStatus: 'Inactive', lastContact: '2026-08-15', totalGiven: 0, doorsKnocked: 0, callsMade: 0, hours: 0, team: null },
]

export const donations = [
  { id: 1, personId: 1, amount: 10000, date: '2026-08-12', fund: 'General Campaign Fund', recurring: false, employer: 'Lagos State Schools Board', occupation: 'Teacher' },
  { id: 2, personId: 3, amount: 25000, date: '2026-08-14', fund: 'General Campaign Fund', recurring: false, employer: 'Self-employed', occupation: 'Designer' },
  { id: 3, personId: 5, amount: 8000, date: '2026-08-18', fund: 'Volunteer Fund', recurring: true, employer: 'Rivers State Health Service', occupation: 'Nurse' },
  { id: 4, personId: 6, amount: 150000, date: '2026-08-21', fund: 'General Campaign Fund', recurring: true, employer: 'Garba & Sons Trading', occupation: 'Managing Director' },
  { id: 5, personId: 7, amount: 3500, date: '2026-08-26', fund: 'Media Fund', recurring: false, employer: 'Anambra Market Traders', occupation: 'Trader' },
  { id: 6, personId: 9, amount: 12000, date: '2026-08-29', fund: 'General Campaign Fund', recurring: true, employer: 'Ikeja Municipal', occupation: 'Civil Servant' },
  { id: 7, personId: 1, amount: 5000, date: '2026-09-02', fund: 'Volunteer Fund', recurring: false, employer: 'Lagos State Schools Board', occupation: 'Teacher' },
  { id: 8, personId: 5, amount: 8000, date: '2026-09-04', fund: 'Volunteer Fund', recurring: true, employer: 'Rivers State Health Service', occupation: 'Nurse' },
  { id: 9, personId: 3, amount: 15000, date: '2026-09-05', fund: 'Events Fund', recurring: false, employer: 'Self-employed', occupation: 'Designer' },
]

export const canvassResults = [
  { id: 1, personId: 1, date: '2026-09-06', type: 'door', result: 'Supporter' },
  { id: 2, personId: 2, date: '2026-09-05', type: 'phone', result: 'Supporter' },
  { id: 3, personId: 5, date: '2026-09-06', type: 'door', result: 'Undecided' },
]

export const teams = [
  { id: 1, name: 'Lagos Island Branch', organizer: 'Field Team' },
  { id: 2, name: 'Surulere Phone Crew', organizer: 'Outreach Team' },
  { id: 3, name: 'Kano South Branch', organizer: 'Field Team' },
]

export const filingDeadlines = [
  { id: 1, title: 'Monthly Contribution Report', date: '2026-09-15', type: 'Contribution report' },
  { id: 2, title: 'Pre-Election Disclosure', date: '2027-01-24', type: 'Disclosure' },
  { id: 3, title: 'Pre-Election Disclosure (Final)', date: '2027-02-10', type: 'Disclosure' },
  { id: 4, title: 'Post-Election Report', date: '2027-03-15', type: 'Reporting' },
]

export const staff = [
  { id: 1, name: 'Adaeze Okonkwo', email: 'adaeze@fup.ng', role: 'admin', title: 'National Campaign Manager' },
  { id: 2, name: 'Emeka Nwankwo', email: 'emeka@fup.ng', role: 'admin', title: 'Finance Director' },
  { id: 3, name: 'Aisha Suleiman', email: 'aisha@fup.ng', role: 'organizer', title: 'Field Organizer' },
  { id: 4, name: 'Tobi Adeleke', email: 'tobi@fup.ng', role: 'organizer', title: 'Outreach Coordinator' },
]

export const outreachMessages = [
  { id: 1, subject: 'Saturday canvass launch — we need you', channel: 'Email', segment: 'Active volunteers', sent: '2026-09-05', recipients: 1240, opens: 862, clicks: 411, replies: 38 },
  { id: 2, subject: 'PVC registration closes soon in your state', channel: 'Email', segment: 'All supporters', sent: '2026-09-08', recipients: 4820, opens: 3012, clicks: 1390, replies: 0 },
  { id: 3, subject: 'Reminder: Ikeja town hall Thursday', channel: 'SMS', segment: 'RSVP\u2019d attendees', sent: '2026-09-09', recipients: 212, opens: 165, clicks: 88, replies: 21 },
]
