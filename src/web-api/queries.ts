import { gql } from '@apollo/client';

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies @rest(type: "Currencies", path: "symbols") {
      success
      symbols
    }
  }
`;

export const GET_EXCHANGE_RATE = gql`
  query GetExchangeRate($base: String!, $symbols: String!) {
    exchangeRate(base: $base, symbols: $symbols) @rest(type: "Rates", path: "latest?{args}") {
      rates
      error
    }
  }
`;