import { fetchAllRates } from "../src";
import fetch from "node-fetch";

// Mocking node-fetch
jest.mock("node-fetch", () => jest.fn());

const mockResponseData = [
  {
    date: "2024-03-30T00:00:00.000Z",
    currencies: [
      {
        code: "EUR",
        quantity: 1,
        rateFormated: "2.9063",
        diffFormated: "0.0049",
        rate: 2.9063,
        name: "Euro",
        diff: -0.0049,
        date: "2024-03-29T17:45:08.333Z",
        validFromDate: "2024-03-30T00:00:00.000Z",
      },
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
      {
        code: "USD",
        quantity: 1,
        rateFormated: "2.6953",
        diffFormated: "0.0025",
        rate: 2.6953,
        name: "US Dollar",
        diff: -0.0025,
        date: "2024-03-29T17:45:08.333Z",
        validFromDate: "2024-03-30T00:00:00.000Z",
      },
    ],
  },
];

describe("fetchAllRates", () => {
  it("should fetch all rates for a given date and return processed data", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    } as any);

    const result = await fetchAllRates(new Date("2024-03-30"));

    expect(result).toEqual({
      date: new Date("2024-03-30T00:00:00.000Z"),
      currencies: [
        {
          code: "EUR",
          quantity: 1,
          rateFormated: "2.9063",
          diffFormated: "0.0049",
          rate: 2.9063,
          name: "Euro",
          diff: -0.0049,
          date: new Date("2024-03-29T17:45:08.333Z"),
          validFromDate: new Date("2024-03-30T00:00:00.000Z"),
        },
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
        {
          code: "USD",
          quantity: 1,
          rateFormated: "2.6953",
          diffFormated: "0.0025",
          rate: 2.6953,
          name: "US Dollar",
          diff: -0.0025,
          date: new Date("2024-03-29T17:45:08.333Z"),
          validFromDate: new Date("2024-03-30T00:00:00.000Z"),
        },
      ],
    });

    // Verifies the fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      `https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/?date=2024-03-30`
    );
  });
});
