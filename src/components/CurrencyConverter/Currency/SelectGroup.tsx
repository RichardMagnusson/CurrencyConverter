import { useQuery } from '@apollo/client';
import React from 'react';
import { Currency } from '../CurrencyConverter';
import { GET_CURRENCIES } from '../../../web-api/queries';
import CurrencySelect from './Select';

type CurrencySelectGroupProps = {
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  setFromCurrency: (item: Currency) => void;
  setToCurrency: (item: Currency) => void;
};

const CurrencySelectGroup: React.FC<CurrencySelectGroupProps> = ({
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
}: CurrencySelectGroupProps) => {
  const { data } = useQuery(GET_CURRENCIES);
  const currencies: [Currency] | [] =
    data && data.currencies.symbols
      ? (Object.entries(data.currencies.symbols) as [Currency])
      : ([] as []);

  return (
    <>
      <CurrencySelect
        title="Convert from:"
        id="convert-from"
        items={currencies}
        selectedItem={fromCurrency}
        setSelectedItem={(item) => setFromCurrency(item as Currency)}
      />
      <CurrencySelect
        title="Convert to:"
        id="convert-to"
        items={currencies}
        selectedItem={toCurrency}
        setSelectedItem={(item) => setToCurrency(item as Currency)}
      />
    </>
  );
};

export default CurrencySelectGroup;
