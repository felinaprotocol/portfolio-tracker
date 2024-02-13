import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';
require('dotenv').config();

const createApolloClient = () => new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT,
    fetch,
    headers: {
      'Content-Type': 'application/json',
      Origin: process.env.ORIGIN_URL || 'https://app.uniswap.org',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36',
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
  },
});

const client = createApolloClient();
export default client;
