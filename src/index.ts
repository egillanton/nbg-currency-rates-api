// src/index.ts
import fetch from "node-fetch";

/** List of supported languages */
const languageList = ["en", "ka"] as const;

/** Default language setting */
let lang: Language = "en";

/** List of supported currencies */
const currencyList = [
  "AED",
  "AMD",
  "AUD",
  "AZN",
  "BGN",
  "BRL",
  "BYN",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EGP",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "ILS",
  "INR",
  "IRR",
  "ISK",
  "JPY",
  "KGS",
  "KRW",
  "KWD",
  "KZT",
  "MDL",
  "NOK",
  "NZD",
  "PLN",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "SEK",
  "SGD",
  "TJS",
  "TMT",
  "TRY",
  "UAH",
  "USD",
  "UZS",
  "ZAR",
] as const;

/**
 * Represents supported languages.
 */
export type Language = (typeof languageList)[number];

/** Base URL for the API */
const BASE_URL: string =
  "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies";

/**
 * Represents currency codes.
 */
export type Currency = (typeof currencyList)[number];

/**
 * Sets the default language for API requests.
 * @param newLang The new language to set.
 * @throws {Error} Throws an error if the language is not supported.
 */
export function setDefaultLanguage(newLang: Language): void {
  if (languageList.includes(newLang)) {
    lang = newLang;
  } else {
    throw new Error("Unsupported language");
  }
}

/**
 * Represents the rate of a currency.
 */
export type CurrencyRate = {
  code: string;
  quantity: number;
  rateFormated: string;
  diffFormated: string;
  rate: number;
  name: string;
  diff: number;
  date: Date;
  validFromDate: Date;
};

/**
 * Represents currency data, including date and an array of currency rates.
 */
export type CurrencyData = {
  date: Date;
  currencies: CurrencyRate[];
};

async function fetchCurrencyData(url: string): Promise<CurrencyData> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const data: CurrencyRateApiResponse =
    (await response.json()) as CurrencyRateApiResponse;

  // Transforming API response to strongly typed structure
  const firstItem = data[0];
  return {
    date: new Date(firstItem.date),
    currencies: firstItem.currencies.map((currency) => ({
      ...currency,
      date: new Date(currency.date),
      validFromDate: new Date(currency.validFromDate),
    })),
  };
}

/**
 * Fetches all currency rates for a given date.
 * @param date The date for which to fetch currency rates. Defaults to the current date.
 * @returns A promise that resolves to the currency data.
 */
export async function fetchAllRates(
  date: Date = new Date()
): Promise<CurrencyData> {
  const formattedDate = date.toISOString().split("T")[0];
  const url = `${BASE_URL}/${lang}/json/?date=${formattedDate}`;
  return fetchCurrencyData(url);
}

/**
 * Fetches rates for a specific currency and date.
 * @param currency The currency code.
 * @param date The date for which to fetch the rates. Defaults to the current date.
 * @returns A promise that resolves to the currency data.
 */
export async function fetchRatesForCurrency(
  currency: Currency,
  date: Date = new Date()
): Promise<CurrencyData> {
  const formattedDate = date.toISOString().split("T")[0];
  const url = `${BASE_URL}/${lang}/json/?currencies=${currency}&date=${formattedDate}`;
  return fetchCurrencyData(url);
}

// Additional helper types for API response to ensure type safety
type CurrencyRateApiResponseCurrencyItem = {
  code: string;
  quantity: number;
  rateFormated: string;
  diffFormated: string;
  rate: number;
  name: string;
  diff: number;
  date: string;
  validFromDate: string;
};

type CurrencyRateApiResponseItem = {
  date: string;
  currencies: CurrencyRateApiResponseCurrencyItem[];
};

type CurrencyRateApiResponse = CurrencyRateApiResponseItem[];
