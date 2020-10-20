import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Currency } from '../CurrencyConverter';
import styled from 'styled-components';

const StyledAutoComplete = styled(Autocomplete)`
  margin: 1.5rem;
`;

type CurrencySelectProps = {
  title: string;
  id: string;
  items: [Currency] | [];
  selectedItem: Currency | null;
  setSelectedItem: (input: Currency | null) => void;
};

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  title,
  id,
  items,
  selectedItem,
  setSelectedItem,
}: CurrencySelectProps) => {
  const currencyName = (currency: Currency) => currency[1];

  return (
    <StyledAutoComplete
      id={id}
      renderInput={(params) => (
        <TextField {...params} label={title} variant="outlined" />
      )}
      value={selectedItem}
      onChange={(_, newValue: Currency) => setSelectedItem(newValue)}
      options={items}
      getOptionLabel={(option: Currency) => currencyName(option)}
      getOptionSelected={(option: Currency, value: Currency) =>
        currencyName(option) === currencyName(value)
      }
      style={{ minWidth: 300 }}
    />
  );
};

export default CurrencySelect;
