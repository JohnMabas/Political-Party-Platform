// The mock "store" — a single source of truth for the campaign operation.
// In production each of these would resolve to service/API calls; here it is
// in-memory so that one role's action is reflected across every other view.

const today = new Date()

export const ELECTION_DATE = new Date('2026-11-03T00:00:00')
export const CYCLE_GOAL = 250000

export const platformIssues = [
  {
    slug: 'education',
    title: 'Public Schools',
    summary: 'Every classroom fully funded and every educator supported, from early childhood through community college.',
    position: 'We believe a strong public education system is the foundation of an equal and resilient community. Our position is to fully fund public schools, raise teacher pay to keep great educators in the classroom, and expand early-childhood access so every child starts school ready to learn. We support universal pre-K, modernized school facilities, and debt-free paths to community and technical college so that a credential is within reach for everyone who works for it.',
    facts: [
      'State funding per student has grown 4% over the last decade while instructional costs rose 11%.',
      'One in five classrooms in our district is taught by a long-term substitute or uncertified teacher.',
      'Tuition at community college has increased 30% in the past five years.',
    ],
    headline: 'A classroom that works for every child.',
    relatedNews: ['Board approves plan for universal pre-K expansion', 'Teacher retention bill heads to committee'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare Access',
    summary: 'Affordable care close to home, including rural clinics and mental-health coverage that works.',
    position: 'Access to affordable care should not depend on your ZIP code. We support protecting coverage for pre-existing conditions, expanding community health centers in underserved areas, and strengthening mental-health and substance-use services so that care is available where people live. We support negotiated prescription pricing and rural clinic funding that keeps essential services open in communities that need them.',
    facts: [
      'Rural counties average 40% fewer primary-care providers per capita than urban centers.',
      'One in three county residents delayed medical care last year because of cost.',
      'Community health center visits rose 12% year over year as the uninsured rate fell.',
    ],
    headline: 'Care close to home, priced within reach.',
    relatedNews: ['Rural clinic funding restored in budget agreement', 'Expanded mental-health lines now take calls statewide'],
  },
  {
    slug: 'economy',
    title: 'Economic Opportunity',
    summary: 'Good jobs, fair wages, and a path forward for small businesses and working families.',
    position: 'We support policies that grow good jobs and make sure the people doing the work share in the gains. That means raising the minimum wage responsibly, expanding apprenticeship and skills programs, supporting local small businesses and family farms, and making child care and housing affordable so a full-time job is enough to get by and get ahead.',
    facts: [
      'The typical family here spends more than one-third of income on housing.',
      'Small businesses employ half of our residents and have created most new jobs this decade.',
      'There are three open apprenticeship seats for every qualified applicant.',
    ],
    headline: 'A fair share for the people doing the work.',
    relatedNews: ['Small-business grant round opens to 200 applicants', 'Apprenticeship program adds 400 new seats'],
  },
  {
    slug: 'safety',
    title: 'Public Safety',
    summary: 'Responsible, accountable policing and proven investments that prevent crime before it happens.',
    position: 'We support a public-safety approach that is both responsible and effective. That means fully funded, well-trained, and accountable law enforcement, plus investment in the programs that keep crime from happening in the first place — youth services, mental-health response, housing, and substance-use treatment. We support community oversight, crisis-response teams that pair medical staff with first responders, and data-driven deployment.',
    facts: [
      'Violent crime fell 8% last year in communities with active youth programs.',
      'Crisis-response teams divert a majority of eligible calls away from arrest.',
      'Officer vacancy rates have pushed wait times up in several precincts.',
    ],
    headline: 'Safe neighborhoods through accountable and effective policing.',
    relatedNews: ['Crisis-response pilot expands to three more precincts', 'Oversight board releases annual use-of-force report'],
  },
  {
    slug: 'environment',
    title: 'Clean Environment',
    summary: 'Clean water, clean air, and good green jobs for communities on the front lines.',
    position: 'We support building a clean-energy economy that creates jobs, lowers household bills, and cleans up the air and water. Our position includes safe drinking water for every community, expanding public transit and walkable neighborhoods, modernizing the grid, and investing in conservation and climate-resilience projects — with a priority on communities that have carried the burden of pollution longest.',
    facts: [
      'Drinking-water tests found elevated compounds in a dozen districts last year.',
      'Clean-energy jobs grew 15% in the region, outpacing overall employment.',
      'Investing in transit and efficiency cuts household energy costs 20% on average.',
    ],
    headline: 'Healthy communities and good jobs in a cleaner economy.',
    relatedNews: ['Water-infrastructure package clears first committee', 'Transit expansion breaks ground this fall'],
  },
  {
    slug: 'housing',
    title: 'Affordable Housing',
    summary: 'A full range of housing so families can put down roots and stay in the community they call home.',
    position: 'We believe every person deserves a safe, stable, and affordable place to live. We support building housing of all types and price points, protecting renters through stable-tenancy rules and rent stabilization where costs are rising fastest, strengthening tenants\u2019 rights, and investing in supportive housing for neighbors who are unhoused. We support removing outdated zoning that keeps new, affordable homes out of established neighborhoods.',
    facts: [
      'Rents rose 22% in five years while median incomes grew 9%.',
      'A shortage of roughly 40,000 units drives up costs at every level.',
      'Families on housing assistance wait an average of three years for a voucher.',
    ],
    headline: 'A place to call home, at a price people can pay.',
    relatedNews: ['Zoning reform clears planning commission', 'Supportive housing project receives final funding'],
  },
]

export const candidates = [
  {
    slug: 'maya-okoro',
    name: 'Maya Okoro',
    race: 'State Senate, 14th District',
    photo: 'MO',
    tagline: 'Fighting for working families and revitalized downtowns.',
    bio: 'Maya Okoro grew up two blocks from the mill that hired her grandparents and sat empty for a decade before she helped resurrect it as a community center. A former school-board member and small-business owner, she has spent two decades bringing neighbors, unions, and employers to the same table. Maya is running to put that same pragmatism to work in the state senate — on funding schools, bringing manufacturing back, and making housing affordable.',
    endorsements: ['United Workers Council', 'Retired Teachers League', 'Downtown Main Street Alliance'],
    events: ['Riverside Town Hall', 'Mill District Listening Tour'],
    donateLink: true,
  },
  {
    slug: 'james-herrera',
    name: 'James Herrera',
    race: 'State House, 32nd District',
    photo: 'JH',
    tagline: 'A public-health nurse bringing the numbers to the capitol.',
    bio: 'James Herrera spent twelve years as a community health nurse, most of them in the rural counties at the edge of the district where a clinic can be an hour away. He has led mobile health outreach, negotiated with insurers, and trained the next generation of caregivers. In the house, James will champion rural clinic funding, mental-health access, and fair scheduling for health-care workers.',
    endorsements: ['Rural County Nurses Association', 'Community Clinic Alliance'],
    events: ['Copper Creek Health Forum'],
    donateLink: true,
  },
  {
    slug: 'linda-cho',
    name: 'Linda Cho',
    race: 'County Commission, District 5',
    photo: 'LC',
    tagline: 'An urban planner building a county that works for everyone.',
    bio: 'Linda Cho is an urban planner who has spent her career making the county\u2019s transit, housing, and green spaces work for the families who depend on them. She grew the county\u2019s first bus-on-shoulder program and led the affordable-housing bond that delivered 1,400 units. Running for commission, Linda will keep the county focused on housing, transit, and a clean environment.',
    endorsements: ['Transit Riders United', 'County Climate Coalition'],
    events: ['Central Station Community Walk'],
    donateLink: true,
  },
  {
    slug: 'marcus-bell',
    name: 'Marcus Bell',
    race: 'City Council, Ward 3 (At-Large Seat)',
    photo: 'MB',
    tagline: 'A former coach organizing neighborhoods into champions.',
    bio: 'Marcus Bell spent fifteen years coaching youth basketball and, in his words, "learning to listen to everyone." He turned a struggling recreation league into a district-wide program serving thousands of kids. Marcus is running for an at-large council seat to bring that community-first approach to public safety, youth programming, and small-business support.',
    endorsements: ['Neighborhood Youth Sports Council', 'Independent Business Coalition'],
    events: ['Lincoln Courts Listening Session'],
    donateLink: true,
  },
]

export const events = [
  { id: 1, title: 'Riverside Neighborhood Canvass Launch', type: 'Canvass', date: '2026-09-19T09:00:00', location: 'Riverside Rec Center, 412 S Main St', address: '412 S Main St, Riverside', description: 'Join neighbors for a Saturday canvass launch. We\u2019ll pair up in teams, cover assigned streets, and meet back at the rec center for lunch and a debrief. No experience needed — we\u2019ll walk you through the script and turf assignments before you head out.', capacity: 60, rsvps: 41, host: 'Field Team', attendees: [1, 2] },
  { id: 2, title: 'Downtown Town Hall on Housing', type: 'Town Hall', date: '2026-09-24T18:30:00', location: 'Mill District Community Center', address: '88 Foundry Ln, Downtown', description: 'An open town hall focused on the housing shortage, rent stabilization, and the county\u2019s zoning update. Bring your questions and your neighbors. Child care and interpretation will be provided.', capacity: 200, rsvps: 143, host: 'Campaign HQ', attendees: [1] },
  { id: 3, title: 'Phone Bank for Early Voters', type: 'Phone Bank', date: '2026-09-28T17:30:00', location: 'Campaign Headquarters, 210 Union Ave', address: '210 Union Ave', description: 'Call early-voting supporters from HQ with pizza, coffee, and a live call tracker. Training provided on arrival — just bring a phone and a charger.', capacity: 40, rsvps: 22, host: 'Outreach Team', attendees: [2] },
  { id: 4, title: 'Copper Creek Health Forum', type: 'Forum', date: '2026-10-02T11:00:00', location: 'Copper Creek Community Hall', address: '17 Furnace St, Copper Creek', description: 'A listening forum with candidate James Herrera on rural health access. Clinicians, patients, and carriers are all welcome to share what is and isn\u2019t working.', capacity: 120, rsvps: 67, host: 'Issue Team', attendees: [] },
  { id: 5, title: 'Lincoln Courts Listening Session', type: 'Canvass', date: '2026-10-08T15:00:00', location: 'Lincoln Courts Community Room', address: '900 Lincoln Ct', description: 'An afternoon listening session and light canvass in the Lincoln Courts neighborhood, focused on public safety and youth programs.', capacity: 50, rsvps: 18, host: 'Field Team', attendees: [3] },
  { id: 6, title: 'Central Station Community Walk', type: 'Canvass', date: '2026-10-11T09:30:00', location: 'Central Station Plaza', address: '2 Depot St, Central', description: 'A neighborhood walk around the central station corridor to talk housing and transit with residents before ballots go out.', capacity: 40, rsvps: 25, host: 'Field Team', attendees: [] },
  { id: 7, title: 'Get Out the Vote Rally', type: 'Rally', date: '2026-11-01T13:00:00', location: 'Riverside Amphitheater', address: 'Amphitheater Dr, Riverside', description: 'Our closing rally of the cycle with all candidates, live music, and a final push to get voters to the polls. Free and open to all.', capacity: 800, rsvps: 590, host: 'Campaign HQ', attendees: [] },
]

export const news = [
  { id: 1, title: 'Campaign kicks off early-vote push with weekend canvass blitz', date: '2026-09-02', category: 'Press Release', excerpt: 'Volunteers will knock on 10,000 doors across three districts this weekend as the campaign shifts into the final stretch before early voting begins.', body: 'The campaign announced a weekend canvass blitz that will knock on 10,000 doors across three districts, kicking off the early-vote phase of the cycle. Organizers said the effort pairs curb-intel from the summer field program with new neighborhood teams recruited at summer events.', author: 'Campaign Press Office' },
  { id: 2, title: 'Our Story: five years of building the movement, neighborhood by neighborhood', date: '2026-08-25', category: 'Blog', excerpt: 'From a single living-room meeting to tens of thousands of members, a look at how the Common Ground Party grew into a statewide organization.', body: 'Five years ago, twelve neighbors met in a living room to ask a simple question: what if a party could start from one community\u2019s dinner tables instead of a consultant\u2019s slide deck? This month, the organization that grew from that meeting counts 48,000 members, 130 chapters, and a slate of candidates in every district.', author: 'Communications Team' },
  { id: 3, title: 'New volunteer portal makes it easier to find a shift near you', date: '2026-08-18', category: 'Press Release', excerpt: 'Supporters can now sign up for canvass shifts, phone banks, and events from a single portal, with assignments synced to their calendar.', body: 'The campaign released a rebuilt volunteer portal that lets supporters claim shifts, log hours, and track their progress in one place. Organizers say the portal cut the average time to a volunteer\u2019s first shift from nine days to two.', author: 'Digital Team' },
  { id: 4, title: 'Fundraising tops $180,000 as small-dollar donors step up', date: '2026-08-10', category: 'Press Release', excerpt: 'The campaign crossed the $180,000 mark in total fundraising, with two-thirds of contributions of $50 or less.', body: 'The campaign announced it has raised more than $180,000 this cycle, with two-thirds of contributions of $50 or less. The average donation is $38, reflecting a grassroots base that organizers say now includes donors in all 32 precincts of the district.', author: 'Finance Team' },
]

export const endorsements = [
  { name: 'United Workers Council', type: 'Labor Union', quote: 'Maya Okoro has stood with working families for two decades. We are proud to endorse her.' },
  { name: 'Retired Teachers League', type: 'Education', quote: 'No candidate has been a stronger or more consistent champion for our public schools.' },
  { name: 'Independent Business Coalition', type: 'Business', quote: 'A pragmatic candidate who understands the jobs, housing, and streets our towns depend on.' },
  { name: 'Transit Riders United', type: 'Community', quote: 'Linda Cho has already made our buses better. We trust her to finish the job.' },
  { name: 'Rural County Nurses Association', type: 'Health', quote: 'James Herrera brings the perspective of a frontline caregiver straight to the capitol.' },
  { name: 'County Climate Coalition', type: 'Environment', quote: 'A record of investment that pairs a cleaner environment with good local jobs.' },
]

// --- Seed people (supporters/volunteers/donors/contacts) ---
export const people = [
  { id: 1, name: 'Amina Yusuf', email: 'amina.yusuf@example.com', district: 'D5', roles: ['Volunteer', 'Donor', 'Supporter'], tags: ['canvasser', 'high-engagement'], donorStatus: 'Donor', volunteerStatus: 'Active', lastContact: '2026-09-04', totalGiven: 240, doorsKnocked: 112, callsMade: 46, hours: 28, team: 1 },
  { id: 2, name: 'Tyler Brooks', email: 'tyler.brooks@example.com', district: 'D1', roles: ['Volunteer', 'Supporter'], tags: ['phone-banker', 'early-vote'], donorStatus: 'Non-donor', volunteerStatus: 'Active', lastContact: '2026-09-03', totalGiven: 0, doorsKnocked: 18, callsMade: 102, hours: 19, team: 2 },
  { id: 3, name: 'Priya Raman', email: 'priya.raman@example.com', district: 'D3', roles: ['Supporter', 'Donor'], tags: ['host', 'fundraiser'], donorStatus: 'Donor', volunteerStatus: 'Inactive', lastContact: '2026-08-29', totalGiven: 520, doorsKnocked: 4, callsMade: 12, hours: 6, team: 1 },
  { id: 4, name: 'Darnell Washington', email: 'darnell.w@example.com', district: 'D2', roles: ['Volunteer'], tags: ['canvasser', 'new'], donorStatus: 'Non-donor', volunteerStatus: 'Pending', lastContact: '2026-09-01', totalGiven: 0, doorsKnocked: 0, callsMade: 0, hours: 0, team: 3 },
  { id: 5, name: 'Elena Petrova', email: 'elena.petrova@example.com', district: 'D4', roles: ['Supporter', 'Donor', 'Volunteer'], tags: ['precinct-captain', 'host'], donorStatus: 'Recurring', volunteerStatus: 'Active', lastContact: '2026-09-05', totalGiven: 960, doorsKnocked: 88, callsMade: 60, hours: 41, team: 1 },
  { id: 6, name: 'Sam Kowalski', email: 'sam.kowalski@example.com', district: 'D1', roles: ['Donor'], tags: ['major-donor'], donorStatus: 'Recurring', volunteerStatus: 'Inactive', lastContact: '2026-08-20', totalGiven: 1500, doorsKnocked: 0, callsMade: 0, hours: 0, team: null },
  { id: 7, name: 'Grace Osei', email: 'grace.osei@example.com', district: 'D5', roles: ['Volunteer', 'Supporter'], tags: ['phone-banker', 'early-vote'], donorStatus: 'Donor', volunteerStatus: 'Active', lastContact: '2026-09-06', totalGiven: 75, doorsKnocked: 31, callsMade: 140, hours: 34, team: 2 },
  { id: 8, name: 'Owen Gallagher', email: 'owen.gallagher@example.com', district: 'D3', roles: ['Supporter'], tags: ['new'], donorStatus: 'Non-donor', volunteerStatus: 'Pending', lastContact: '2026-08-31', totalGiven: 0, doorsKnocked: 0, callsMade: 0, hours: 0, team: null },
  { id: 9, name: 'Hana Sato', email: 'hana.sato@example.com', district: 'D2', roles: ['Donor', 'Volunteer'], tags: ['host', 'fundraiser'], donorStatus: 'Recurring', volunteerStatus: 'Active', lastContact: '2026-09-02', totalGiven: 380, doorsKnocked: 54, callsMade: 33, hours: 22, team: 3 },
  { id: 10, name: 'Marcus Reid', email: 'marcus.reid@example.com', district: 'D4', roles: ['Supporter'], tags: ['undecided'], donorStatus: 'Non-donor', volunteerStatus: 'Inactive', lastContact: '2026-08-15', totalGiven: 0, doorsKnocked: 0, callsMade: 0, hours: 0, team: null },
]

export const donations = [
  { id: 1, personId: 1, amount: 100, date: '2026-08-12', fund: 'General Campaign Fund', recurring: false, employer: 'Northside Elementary School', occupation: 'Teacher' },
  { id: 2, personId: 3, amount: 250, date: '2026-08-14', fund: 'General Campaign Fund', recurring: false, employer: 'Self-employed', occupation: 'Designer' },
  { id: 3, personId: 5, amount: 80, date: '2026-08-18', fund: 'Volunteer Fund', recurring: true, employer: 'Riverside Health System', occupation: 'Nurse' },
  { id: 4, personId: 6, amount: 500, date: '2026-08-21', fund: 'General Campaign Fund', recurring: true, employer: 'Bellmont Ventures', occupation: 'Manager' },
  { id: 5, personId: 7, amount: 35, date: '2026-08-26', fund: 'Media Fund', recurring: false, employer: 'Union Station Coffee', occupation: 'Barista' },
  { id: 6, personId: 9, amount: 120, date: '2026-08-29', fund: 'General Campaign Fund', recurring: true, employer: 'County Court Records', occupation: 'Clerk' },
  { id: 7, personId: 1, amount: 50, date: '2026-09-02', fund: 'Volunteer Fund', recurring: false, employer: 'Northside Elementary School', occupation: 'Teacher' },
  { id: 8, personId: 5, amount: 80, date: '2026-09-04', fund: 'Volunteer Fund', recurring: true, employer: 'Riverside Health System', occupation: 'Nurse' },
  { id: 9, personId: 3, amount: 150, date: '2026-09-05', fund: 'Events Fund', recurring: false, employer: 'Self-employed', occupation: 'Designer' },
]

export const canvassResults = [
  { id: 1, personId: 1, date: '2026-09-06', type: 'door', result: 'Supporter' },
  { id: 2, personId: 2, date: '2026-09-05', type: 'phone', result: 'Supporter' },
  { id: 3, personId: 5, date: '2026-09-06', type: 'door', result: 'Undecided' },
]

export const teams = [
  { id: 1, name: 'Riverside Chapter', organizer: 'Field Team' },
  { id: 2, name: 'Downtown Phone Crew', organizer: 'Outreach Team' },
  { id: 3, name: 'Central County', organizer: 'Field Team' },
]

export const filingDeadlines = [
  { id: 1, title: 'Monthly Contribution Report', date: '2026-09-15', type: 'Contribution report' },
  { id: 2, title: 'Pre-General Disclosure (24-day)', date: '2026-10-10', type: 'Disclosure' },
  { id: 3, title: 'Pre-General Disclosure (11-day)', date: '2026-10-23', type: 'Disclosure' },
  { id: 4, title: 'Post-General Report', date: '2026-12-08', type: 'Reporting' },
]

export const staff = [
  { id: 1, name: 'Camille North', email: 'camille@commonground.party', role: 'admin', title: 'Campaign Manager' },
  { id: 2, name: 'Derek Alvarez', email: 'derek@commonground.party', role: 'admin', title: 'Finance Director' },
  { id: 3, name: 'Alicia Tran', email: 'alicia@commonground.party', role: 'organizer', title: 'Field Organizer' },
  { id: 4, name: 'Ben Okafor', email: 'ben@commonground.party', role: 'organizer', title: 'Outreach Coordinator' },
]

export const outreachMessages = [
  { id: 1, subject: 'Saturday canvass launch — we need you', channel: 'Email', segment: 'Active volunteers', sent: '2026-09-05', recipients: 1240, opens: 862, clicks: 411, replies: 38 },
  { id: 2, subject: 'Early voting starts in two weeks', channel: 'Email', segment: 'All supporters', sent: '2026-09-08', recipients: 4820, opens: 3012, clicks: 1390, replies: 0 },
  { id: 3, subject: 'Reminder: downtown town hall Thursday', channel: 'SMS', segment: 'RSVP\u2019d attendees', sent: '2026-09-09', recipients: 143, opens: 118, clicks: 64, replies: 21 },
]
