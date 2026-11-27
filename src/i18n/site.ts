// Confirmed facts shared by all languages.
export const site = {
  name: 'Aurora Hacienda Zanzibar',
  geo: { lat: -5.736968776973334, lng: 39.296170872725 },
};
export const mapUrl = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}`;
export const coordsDisplay = `5°44'13"S · 39°17'46"E`;

export const contact = {
  phoneDisplay: '+36 30 385 2459',
  phoneHref: 'tel:+36303852459',
  // both numbers take booking requests (given by the owner, 2026-11-27)
  whatsapp: [
    { display: '+20 111 275 0404', url: 'https://wa.me/201112750404' },
    { display: '+255 773 350 418', url: 'https://wa.me/255773350418' },
  ],
  email: 'aurorahaciendazanzibar@gmail.com',
  emailHref: 'mailto:aurorahaciendazanzibar@gmail.com',
};

// Partner (affiliate) links shown in the travel information sheet. Paste the tracking links from the
// Travelpayouts dashboard here. An empty value hides that button.
export const partners = {
  flights: 'https://www.kiwi.com/', // plain link; paste the Kiwi.com tracking link here later
  esim: 'https://www.airalo.com/',
  travelInsurance: '',
  // set to true once the links above are real affiliate links: it shows the disclosure text
  affiliate: false,
};

// Search engines. At launch (own domain connected) set indexable to true: that one switch
// removes noindex and opens robots.txt with the sitemap.
export const seo: { indexable: boolean; googleBusinessUrl: string; googleSiteVerification: string; profiles: string[] } = {
  indexable: false,
  googleBusinessUrl: '', // the hotel's Google Business Profile / Maps link
  googleSiteVerification: '', // code from Google Search Console (HTML tag method)
  profiles: [], // Instagram, Facebook, TripAdvisor ... when they exist
};
