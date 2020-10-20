import React from 'react';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import { StylesProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import client from './web-api/client';

const Wrapper = styled.div`
    font-family: 'Roboto', 'Arial', 'Sans-Serif';
    display: flex;
    flex-direction: column;
    justify-content; center;
    align-items: center;
`;

const Title = styled.h1`
  font-weight: lighter;
`;

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <StylesProvider injectFirst>
      <Wrapper>
        <header>
          <Title>Currency Converter</Title>
        </header>
        <main>
          <CurrencyConverter />
        </main>
      </Wrapper>
    </StylesProvider>
  </ApolloProvider>
);

export default App;
