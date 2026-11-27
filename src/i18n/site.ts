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
  whatsappUrl: 'https://wa.me/36303852459',
  email: 'aurorahaciendazanzibar@gmail.com',
  emailHref: 'mailto:aurorahaciendazanzibar@gmail.com',
};

// Partner (affiliate) links shown in the travel information sheet. Paste the tracking links from the
// Travelpayouts dashboard here. An empty value hides that button.
export const partners = {
  flights: 'https://www.kiwi.com/', // plain link until the Travelpayouts tracking link is pasted here
  esim: 'https://www.airalo.com/',
  travelInsurance: '',
};
