import React, { useState, useEffect } from 'react';
import { GET_EXCHANGE_RATE } from '../../../web-api/queries';
import { TextField } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Currency } from '../CurrencyConverter';
import { roundNumber } from '../../../utils/util';

const StyledTextField = styled(TextField)`
  margin: 1.5rem;
`;

type AmountFieldGroupProps = {
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  setErrorMessage: (input: string) => void;
};

const AmountFieldGroup: React.FC<AmountFieldGroupProps> = ({
  fromCurrency,
  toCurrency,
  setErrorMessage,
}: AmountFieldGroupProps) => {
  const currencySymbol = (currency: Currency | null) =>
    currency ? currency[0] : '';

  const queryArgs = {
    variables: {
      base: currencySymbol(fromCurrency),
      symbols: currencySymbol(toCurrency),
    },
    skip: !fromCurrency || !toCurrency,
  };

  const { data } = useQuery(GET_EXCHANGE_RATE, queryArgs);

  const exchangeRate: number | null =
    data && data.exchangeRate.rates
      ? data.exchangeRate.rates[currencySymbol(toCurrency)]
      : null;

  useEffect(() => {
    if (data && data.exchangeRate.error) {
      setErrorMessage(data.exchangeRate.error.type);
    }
    if (data && !data.exchangeRate.error) setErrorMessage('');
  }, [data]);

  const inputInitValue = '0';
  const [inputAmount, setInputAmount] = useState<string>(inputInitValue);
  const outputAmount =
    inputAmount && exchangeRate
      ? roundNumber(parseInt(inputAmount) * exchangeRate, 2)
      : '0';

  const fieldLabel = (currency: Currency | null) =>
    currency ? currencySymbol(currency) : 'Select currency';

  return (
    <>
      <StyledTextField
        id="convert-input"
        type="number"
        label={fieldLabel(fromCurrency)}
        value={inputAmount}
        onChange={(event) => setInputAmount(event.target.value)}
        onBlur={() => !inputAmount && setInputAmount(inputInitValue)}
        disabled={!exchangeRate}
        variant="outlined"
        style={{ minWidth: 300 }}
      />
      <StyledTextField
        id="convert-output"
        label={fieldLabel(toCurrency)}
        value={outputAmount}
        disabled
        variant="outlined"
        style={{ minWidth: 300 }}
      />
    </>
  );
};

export default AmountFieldGroup;
