import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import styled from 'styled-components';
import CurrencySelectGroup from './Currency/SelectGroup';
import AmountFieldGroup from './Amount/FieldGroup';

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 680px) {
    flex-direction: column;∏
  }
`;

const StyledAlert = styled(Alert)`
  width: 100%;
  margin: 1.5rem;
  @media screen and (max-width: 680px) {
    width: auto;∏
  }
`;

export type Currency = [currencySymbol: string, currencyName: string];

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <>
      <ItemRow>
        <CurrencySelectGroup
          fromCurrency={fromCurrency}
          setFromCurrency={(item) => setFromCurrency(item)}
          toCurrency={toCurrency}
          setToCurrency={(item) => setToCurrency(item)}
        />
      </ItemRow>
      <ItemRow>
        <AmountFieldGroup
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          setErrorMessage={(input) => setErrorMessage(input)}
        />
      </ItemRow>
      <ItemRow>
        <StyledAlert severity="warning">
          Only Euro available as base currency in free version
        </StyledAlert>
      </ItemRow>
      {!!errorMessage && (
        <Fade in={!!errorMessage}>
          <ItemRow>
            <StyledAlert
              onClose={() => setErrorMessage('')}
              variant="filled"
              severity="error"
            >
              {errorMessage}
            </StyledAlert>
          </ItemRow>
        </Fade>
      )}
    </>
  );
};

export default CurrencyConverter;
