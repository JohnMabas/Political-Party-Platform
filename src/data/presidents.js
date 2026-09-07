// Heads of State and Presidents of Nigeria, in order of service.
// Used for the local hero slideshow on the public home page.

export const PRESIDENTS = [
  { slug: 'azikiwe', name: 'Dr. Nnamdi Azikiwe', title: 'President of Nigeria', tenure: '1960 – 1966', note: 'Nigeria’s first President and a founding father of the nation.' },
  { slug: 'ironsi', name: 'Maj. Gen. Johnson Aguiyi-Ironsi', title: 'Head of State', tenure: 'Jan – Jul 1966', note: 'First military head of state of the Republic.' },
  { slug: 'gowon', name: 'Gen. Yakubu Gowon', title: 'Head of State', tenure: '1966 – 1975', note: 'Led national reconciliation after the civil war.' },
  { slug: 'murtala', name: 'Gen. Murtala Mohammed', title: 'Head of State', tenure: '1975 – 1976', note: 'Decisive reformer who died in office in 1976.' },
  { slug: 'obasanjo-76', name: 'Gen. Olusegun Obasanjo', title: 'Head of State', tenure: '1976 – 1979', note: 'Handed power back to elected civilian leaders.' },
  { slug: 'shagari', name: 'Alhaji Shehu Shagari', title: 'President of Nigeria', tenure: '1979 – 1983', note: 'President of the Second Republic.' },
  { slug: 'buhari-85', name: 'Maj. Gen. Muhammadu Buhari', title: 'Head of State', tenure: '1983 – 1985', note: 'Military head of state during the War Against Indiscipline.' },
  { slug: 'babangida', name: 'Gen. Ibrahim Babangida', title: 'President', tenure: '1985 – 1993', note: 'Oversaw far-reaching economic and political reforms.' },
  { slug: 'shonekan', name: 'Chief Ernest Shonekan', title: 'Interim President', tenure: 'Aug – Nov 1993', note: 'Head of the short-lived Interim National Government.' },
  { slug: 'abacha', name: 'Gen. Sani Abacha', title: 'Head of State', tenure: '1993 – 1998', note: 'Military ruler of the mid-1990s.' },
  { slug: 'abdulsalami', name: 'Gen. Abdulsalami Abubakar', title: 'Head of State', tenure: '1998 – 1999', note: 'Returned Nigeria to democracy in 1999.' },
  { slug: 'obasanjo-99', name: 'Chief Olusegun Obasanjo', title: 'President of Nigeria', tenure: '1999 – 2007', note: 'First President of the Fourth Republic.' },
  { slug: 'yaradua', name: 'Alhaji Umaru Musa Yar’Adua', title: 'President of Nigeria', tenure: '2007 – 2010', note: 'Champion of the amnesty programme in the Niger Delta.' },
  { slug: 'jonathan', name: 'Dr. Goodluck Jonathan', title: 'President of Nigeria', tenure: '2010 – 2015', note: 'Oversaw a peaceful transfer of power in 2015.' },
  { slug: 'buhari-15', name: 'Muhammadu Buhari', title: 'President of Nigeria', tenure: '2015 – 2023', note: 'Two-term president focused on infrastructure and security.' },
  { slug: 'tinubu', name: 'Bola Ahmed Adekunle Tinubu', title: 'President of Nigeria', tenure: '2023 – Present', note: 'Champion of the Renewed Hope Agenda for national prosperity.' },
]

export const imgFor = (slug) => `/presidents/${slug}.jpg`