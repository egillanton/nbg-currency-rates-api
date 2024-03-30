# NBG Currency Rates API

[![CI](https://github.com/egillanton/nbg-currency-rates-api/actions/workflows/main.yml/badge.svg)](https://github.com/egillanton/nbg-currency-rates-api/actions/workflows/main.yml)

[![Publish](https://github.com/egillanton/nbg-currency-rates-api/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/egillanton/nbg-currency-rates-api/actions/workflows/npm-publish.yml)

An API wrapper around `nbg.gov.ge` for fetching the National Bank of Georgia's currency rates. This package simplifies the process of retrieving currency exchange rates and provides an easy-to-use interface for developers.
TypeScript support is included.

## Features

- Fetch all currency rates for a given date.
- Fetch specific currency rates for a given date.
- Set the default language for API responses (`en` for English, `ka` for Georgian).

## Installation

Install via npm:

```bash
npm install nbg-currency-rates-api
```

via yarn:

```bash
yarn add nbg-currency-rates-api
```

or via pnpm:

```bash
pnpm add nbg-currency-rates-api
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

The default language for API responses is English. You can change it to Georgian by calling the `setDefaultLanguage` function:

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

The preferred package manager for this project is `pnpm`. If you don't have it installed, you can do so by running:
```bash
npm install -g pnpm
```


Please use changesets before your pull request.
```bash
pnpm changeset
```

```bash

## License
This project is licensed under the MIT License - see the LICENSE file for details.