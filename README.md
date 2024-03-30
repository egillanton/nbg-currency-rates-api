# NBG Currency Rates API

An API wrapper around `nbg.gov.ge` for fetching the National Bank of Georgia's currency rates. This package simplifies the process of retrieving currency exchange rates and provides an easy-to-use interface for developers.

## Features

- Fetch all currency rates for a given date.
- Fetch specific currency rates for a given date.
- Set the default language for API responses (`en` for English, `ka` for Georgian).

## Installation

Install via npm:

```bash
npm install nbg-currency-rates-api
```

or via yarn:

```bash
yarn add nbg-currency-rates-api
```

## Usage

First, import the package in your project:

```typescript
import { fetchAllRates, fetchRatesForCurrency, setDefaultLanguage } from 'nbg-currency-rates-api';
```

or in JavaScript:

```javascript
const { fetchAllRates, fetchRatesForCurrency, setDefaultLanguage } = require('nbg-currency-rates-api');
```

## Setting the Default Language

```typescript
// Set to Georgian
setDefaultLanguage('ka');
```

## Fetching All Currency Rates

```typescript
const allRates = await fetchAllRates(new Date('2021-10-01'));
console.log(allRates);
```

## Fetching Specific Currency Rates

```typescript
const currencyRates = await fetchRatesForCurrency('USD', new Date('2021-10-01'));
console.log(currencyRates);
```

## API Reference
`setDefaultLanguage(language: Language): void`

Sets the default language for API responses.

`fetchAllRates(date?: Date): Promise<CurrencyData>`

Fetches all currency rates for a given date.

`fetchRatesForCurrency(currency: Currency, date?: Date): Promise<CurrencyData>`

Fetches specific currency rates for a given date.

## Contributing
Contributions are welcome! Please feel free to submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.