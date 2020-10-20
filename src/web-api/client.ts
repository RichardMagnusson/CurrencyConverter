import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const authFetch: RestLink.CustomFetch = (_url, options) => {
  const url = new URL(_url as string);
  let searchParams = url.searchParams;
  searchParams.set('access_key', process.env.REACT_APP_CURRENCY_EXCHANGE_API_KEY || '')
  url.search = searchParams.toString();
  return fetch(url.toString(), options);
}

const httpLink = new RestLink({ uri: process.env.REACT_APP_CURRENCY_EXCHANGE_API_URL, customFetch: authFetch });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  credentials: 'include'
});

export default client;
