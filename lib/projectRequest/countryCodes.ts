// Dial codes for the quote form country selector. Sorted by country name.
// Value is the E.164 dial prefix (shared codes like +1 appear once per country).

export type CountryDialCode = {
  name: string;
  dial: string;
  iso: string;
};

export const DEFAULT_COUNTRY_ISO = "UG";

export const COUNTRY_DIAL_CODES: ReadonlyArray<CountryDialCode> = [
  { name: "Afghanistan", dial: "+93", iso: "AF" },
  { name: "Albania", dial: "+355", iso: "AL" },
  { name: "Algeria", dial: "+213", iso: "DZ" },
  { name: "Argentina", dial: "+54", iso: "AR" },
  { name: "Australia", dial: "+61", iso: "AU" },
  { name: "Austria", dial: "+43", iso: "AT" },
  { name: "Bahrain", dial: "+973", iso: "BH" },
  { name: "Bangladesh", dial: "+880", iso: "BD" },
  { name: "Belgium", dial: "+32", iso: "BE" },
  { name: "Benin", dial: "+229", iso: "BJ" },
  { name: "Botswana", dial: "+267", iso: "BW" },
  { name: "Brazil", dial: "+55", iso: "BR" },
  { name: "Burundi", dial: "+257", iso: "BI" },
  { name: "Cameroon", dial: "+237", iso: "CM" },
  { name: "Canada", dial: "+1", iso: "CA" },
  { name: "Chile", dial: "+56", iso: "CL" },
  { name: "China", dial: "+86", iso: "CN" },
  { name: "Colombia", dial: "+57", iso: "CO" },
  { name: "Congo (DRC)", dial: "+243", iso: "CD" },
  { name: "Congo (Republic)", dial: "+242", iso: "CG" },
  { name: "Côte d'Ivoire", dial: "+225", iso: "CI" },
  { name: "Czechia", dial: "+420", iso: "CZ" },
  { name: "Denmark", dial: "+45", iso: "DK" },
  { name: "Egypt", dial: "+20", iso: "EG" },
  { name: "Estonia", dial: "+372", iso: "EE" },
  { name: "Ethiopia", dial: "+251", iso: "ET" },
  { name: "Finland", dial: "+358", iso: "FI" },
  { name: "France", dial: "+33", iso: "FR" },
  { name: "Germany", dial: "+49", iso: "DE" },
  { name: "Ghana", dial: "+233", iso: "GH" },
  { name: "Greece", dial: "+30", iso: "GR" },
  { name: "Hong Kong", dial: "+852", iso: "HK" },
  { name: "Hungary", dial: "+36", iso: "HU" },
  { name: "India", dial: "+91", iso: "IN" },
  { name: "Indonesia", dial: "+62", iso: "ID" },
  { name: "Ireland", dial: "+353", iso: "IE" },
  { name: "Israel", dial: "+972", iso: "IL" },
  { name: "Italy", dial: "+39", iso: "IT" },
  { name: "Japan", dial: "+81", iso: "JP" },
  { name: "Jordan", dial: "+962", iso: "JO" },
  { name: "Kenya", dial: "+254", iso: "KE" },
  { name: "Kuwait", dial: "+965", iso: "KW" },
  { name: "Lebanon", dial: "+961", iso: "LB" },
  { name: "Liberia", dial: "+231", iso: "LR" },
  { name: "Malawi", dial: "+265", iso: "MW" },
  { name: "Malaysia", dial: "+60", iso: "MY" },
  { name: "Mexico", dial: "+52", iso: "MX" },
  { name: "Morocco", dial: "+212", iso: "MA" },
  { name: "Mozambique", dial: "+258", iso: "MZ" },
  { name: "Namibia", dial: "+264", iso: "NA" },
  { name: "Netherlands", dial: "+31", iso: "NL" },
  { name: "New Zealand", dial: "+64", iso: "NZ" },
  { name: "Nigeria", dial: "+234", iso: "NG" },
  { name: "Norway", dial: "+47", iso: "NO" },
  { name: "Oman", dial: "+968", iso: "OM" },
  { name: "Pakistan", dial: "+92", iso: "PK" },
  { name: "Philippines", dial: "+63", iso: "PH" },
  { name: "Poland", dial: "+48", iso: "PL" },
  { name: "Portugal", dial: "+351", iso: "PT" },
  { name: "Qatar", dial: "+974", iso: "QA" },
  { name: "Romania", dial: "+40", iso: "RO" },
  { name: "Rwanda", dial: "+250", iso: "RW" },
  { name: "Saudi Arabia", dial: "+966", iso: "SA" },
  { name: "Senegal", dial: "+221", iso: "SN" },
  { name: "Singapore", dial: "+65", iso: "SG" },
  { name: "South Africa", dial: "+27", iso: "ZA" },
  { name: "South Korea", dial: "+82", iso: "KR" },
  { name: "South Sudan", dial: "+211", iso: "SS" },
  { name: "Spain", dial: "+34", iso: "ES" },
  { name: "Sudan", dial: "+249", iso: "SD" },
  { name: "Sweden", dial: "+46", iso: "SE" },
  { name: "Switzerland", dial: "+41", iso: "CH" },
  { name: "Tanzania", dial: "+255", iso: "TZ" },
  { name: "Thailand", dial: "+66", iso: "TH" },
  { name: "Turkey", dial: "+90", iso: "TR" },
  { name: "Uganda", dial: "+256", iso: "UG" },
  { name: "Ukraine", dial: "+380", iso: "UA" },
  { name: "United Arab Emirates", dial: "+971", iso: "AE" },
  { name: "United Kingdom", dial: "+44", iso: "GB" },
  { name: "United States", dial: "+1", iso: "US" },
  { name: "Vietnam", dial: "+84", iso: "VN" },
  { name: "Zambia", dial: "+260", iso: "ZM" },
  { name: "Zimbabwe", dial: "+263", iso: "ZW" },
];

const BY_ISO = new Map(COUNTRY_DIAL_CODES.map((country) => [country.iso, country]));

export const COUNTRY_ISO_VALUES = new Set(COUNTRY_DIAL_CODES.map((country) => country.iso));

export function countryByIso(iso: string): CountryDialCode | undefined {
  return BY_ISO.get(iso);
}

export function formatDialLabel(country: CountryDialCode): string {
  return `${country.name} (${country.dial})`;
}
