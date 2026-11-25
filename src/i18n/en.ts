// English copy. Plain, simple wording for international guests.
// Anything not confirmed by the hotel is wrapped as { tbc: '...' } and shown with a "to be confirmed" mark.
export const en = {
  meta: {
    title: 'Aurora Hacienda Zanzibar – a small hotel in Nungwi',
    description:
      'Aurora Hacienda is a small hotel with four rooms in Nungwi, at the northern tip of Zanzibar, Tanzania. Built in the traditional Zanzibari style.',
  },
  nav: { start: 'Overview', home: 'Welcome', stay: 'Rooms', dining: 'Dining', house: 'The house', place: 'Nungwi', experiences: 'Experiences', book: 'Book', menu: 'Menu', close: 'Close', language: 'Language', scroll: 'Scroll down', quick: 'Quick links' },
  hero: {
    eyebrow: 'Nungwi · Zanzibar · Tanzania',
    title: 'A small hotel at the northern tip of Zanzibar',
    text: 'Four rooms, built in the traditional Zanzibari style.',
    cta: 'Send a booking request',
    check: 'Check availability',
    time: 'Local time in Zanzibar',
  },
  welcome: {
    eyebrow: 'Welcome',
    title: 'Aurora Hacienda',
    p1: 'Aurora Hacienda is a small hotel in Nungwi, on the northern tip of Zanzibar island in Tanzania.',
    p2: 'We have four rooms. The house and the rooms follow the traditional Zanzibari style.',
    facts: ['Four rooms · Breakfast included', 'Own restaurant & cocktail bar', 'Personal airport transfer', 'Night security & CCTV'],
  },
  rooms: {
    eyebrow: 'Rooms',
    title: 'Four rooms',
    intro: 'Each room has an en-suite bathroom and full modern comfort in traditional Zanzibari style.',
    amenities: ['En-suite bathroom', 'Air conditioning', 'Fan', 'TV', 'Refrigerator', 'Coffee & tea bar', 'In-room safe'],
    items: [
      { name: 'Room 1', text: { tbc: 'Individual room details coming soon.' } },
      { name: 'Room 2', text: { tbc: 'Individual room details coming soon.' } },
      { name: 'Room 3', text: { tbc: 'Individual room details coming soon.' } },
      { name: 'Room 4', text: { tbc: 'Individual room details coming soon.' } },
    ],
    rateLabel: 'Rates',
    rateBasis: 'Per room · 2 guests · Per night · Breakfast included',
    rateInquiry: 'For current rates, contact us via WhatsApp, phone, Messenger or email.',
    request: 'Request stay',
  },
  dining: {
    eyebrow: 'Dining & Bar',
    title: 'Own kitchen, island flavours & cocktails',
    text: 'Wake up to breakfast included with every stay, and enjoy our own restaurant and bar from midday into the evening.',
    pillars: [
      {
        title: 'Breakfast included',
        text: 'European and homestyle flavours alongside a vibrant spread of local Zanzibari dishes.',
      },
      {
        title: 'Restaurant & themed nights',
        text: 'À la carte lunch and dinner from our own kitchen, plus regular weekly themed evenings.',
      },
      {
        title: 'Bar, coffee & cocktails',
        text: 'Alcoholic and non-alcoholic drinks, specialty coffees and teas, and local and international cocktails.',
      },
    ],
  },
  house: {
    eyebrow: 'The house',
    title: 'Zanzibari style',
    text: 'The building is made in the traditional Zanzibari style.',
    securityLabel: 'Peace of mind',
    securityText: 'Nighttime security by Imara Security (Tanzania) and CCTV in common areas.',
    more: { tbc: 'More about the building, the garden and the common areas will follow.' },
  },
  place: {
    eyebrow: 'Location',
    title: 'Nungwi',
    text: 'Nungwi is a village at the very north of Zanzibar island.',
    more: { tbc: 'Distance to the beach, the airport and Stone Town will follow.' },
    map: 'Open in Google Maps',
  },
  experiences: {
    eyebrow: 'Experiences',
    transfer: {
      label: 'Arrival',
      title: 'Personal airport transfer',
      text: 'Your stay begins the moment you land. The owner personally picks up every guest at the airport and brings you straight to Aurora Hacienda in Nungwi.',
      note: { tbc: 'Transfer details and rates to be confirmed.' },
      cta: 'Request airport pickup',
    },
    excursions: {
      label: 'Island life',
      title: 'Zanzibar excursions & mainland safaris',
      text: 'Discover the richness of Zanzibar with diverse island excursions, or journey further on a mainland Tanzania safari. Book directly on-site, or ask the owner where to go and when.',
      pillars: [
        { title: 'Zanzibar excursions', text: 'Diverse island tours arranged directly with us during your stay.' },
        { title: 'Mainland safari', text: 'Unforgettable wildlife safaris on mainland Tanzania.' },
        { title: 'Personal host guidance', text: 'The owner personally shares where to go and the best time to explore.' },
      ],
      note: { tbc: 'Excursion options and pricing will follow.' },
      cta: 'Plan your stay',
    },
  },
  book: {
    eyebrow: 'Book',
    title: 'Send a booking request',
    text: 'Rates are per room, for 2 guests per night including breakfast. Send your dates via WhatsApp or email, or reach out directly by phone or Messenger.',
    name: 'Your name',
    email: 'Email',
    arrival: 'Arrival',
    departure: 'Departure',
    guests: 'Number of guests',
    transfer: 'Request personal airport transfer (owner pickup)',
    message: 'Message (optional)',
    sendWhatsapp: 'Send via WhatsApp',
    sendEmail: 'Send via Email',
    whatsapp: 'WhatsApp',
    emailLabel: 'Email',
    rateNote: 'Rates: per room / 2 guests / per night, breakfast included.',
    validationMsg: 'Please enter your name, or contact us directly via WhatsApp or email above.',
  },
  footer: {
    address: 'Nungwi, Zanzibar, Tanzania',
    rights: 'All rights reserved.',
    credit: 'Designed & built by SA Software',
  },
  tbcLabel: 'To be confirmed',
};
export type Dict = typeof en;
