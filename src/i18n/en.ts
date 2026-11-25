// English copy. Plain, simple wording for international guests.
// Anything not confirmed by the hotel is wrapped as { tbc: '...' } and shown with a "to be confirmed" mark.
export const en = {
  meta: {
    title: 'Aurora Hacienda Zanzibar – a small hotel in Nungwi',
    description:
      'Aurora Hacienda is a small hotel with four rooms in Nungwi, at the northern tip of Zanzibar, Tanzania. Built in the traditional Zanzibari style.',
  },
  nav: { home: 'Welcome', stay: 'Rooms', house: 'The house', place: 'Nungwi', book: 'Book', menu: 'Menu', close: 'Close', language: 'Language', scroll: 'Scroll down', quick: 'Quick links' },
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
  },
  rooms: {
    eyebrow: 'Rooms',
    title: 'Four rooms',
    intro: 'Each room is different. Photos, sizes and prices are coming soon.',
    items: [
      { name: 'Room 1', text: { tbc: 'Description coming soon.' } },
      { name: 'Room 2', text: { tbc: 'Description coming soon.' } },
      { name: 'Room 3', text: { tbc: 'Description coming soon.' } },
      { name: 'Room 4', text: { tbc: 'Description coming soon.' } },
    ],
    price: 'Price per night',
    priceTbc: { tbc: 'To be announced' },
  },
  house: {
    eyebrow: 'The house',
    title: 'Zanzibari style',
    text: 'The building is made in the traditional Zanzibari style.',
    more: { tbc: 'More about the building, the garden and the common areas will follow.' },
  },
  place: {
    eyebrow: 'Location',
    title: 'Nungwi',
    text: 'Nungwi is a village at the very north of Zanzibar island.',
    more: { tbc: 'Distance to the beach, the airport and Stone Town will follow.' },
    map: 'Open in Google Maps',
  },
  book: {
    eyebrow: 'Book',
    title: 'Send a booking request',
    text: 'Tell us your dates and we will answer your request.',
    name: 'Your name',
    email: 'Email',
    arrival: 'Arrival',
    departure: 'Departure',
    guests: 'Number of guests',
    message: 'Message (optional)',
    send: 'Send request',
    note: { tbc: 'Payment: to be confirmed by the hotel.' },
    unavailable: 'The online form is not active yet.',
  },
  footer: {
    address: 'Nungwi, Zanzibar, Tanzania',
    rights: 'All rights reserved.',
    credit: 'Designed & built by SA Software',
    photoCredit: 'Temporary demo photos from Wikimedia Commons: Paul W (CC0); door: Eric Kilby (CC BY-SA 2.0).',
  },
  tbcLabel: 'To be confirmed',
};
export type Dict = typeof en;
