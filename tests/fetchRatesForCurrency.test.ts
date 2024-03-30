import { fetchRatesForCurrency } from "../src";
import fetch from "node-fetch";

// Mocking node-fetch
jest.mock("node-fetch", () => jest.fn());

const mockResponseData = [
  {
    date: "2024-03-30T00:00:00.000Z",
    currencies: [
      {
        code: "ISK",
        quantity: 100,
        rateFormated: "1.9339",
        diffFormated: "0.0084",
        rate: 1.9339,
        name: "Iceland Krona",
        diff: -0.0084,
        date: "2024-03-29T17:45:08.333Z",
        validFromDate: "2024-03-30T00:00:00.000Z",
      },
    ],
  },
];

describe("fetchRatesForCurrency", () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it("should fetch rates for a specific currency (ISK) and date (2024-03-30)", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    } as any);

    const date = new Date("2024-03-30");
    const currency = "ISK";
    const result = await fetchRatesForCurrency(currency, date);

    expect(result).toEqual({
      date: new Date("2024-03-30T00:00:00.000Z"),
      currencies: [
        {
          code: "ISK",
          quantity: 100,
          rateFormated: "1.9339",
          diffFormated: "0.0084",
          rate: 1.9339,
          name: "Iceland Krona",
          diff: -0.0084,
          date: new Date("2024-03-29T17:45:08.333Z"),
          validFromDate: new Date("2024-03-30T00:00:00.000Z"),
        },
      ],
    });

    // Verifies the fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      `https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/?currencies=ISK&date=2024-03-30`
    );
  });
});
