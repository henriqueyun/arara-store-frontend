import React from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import { Remove, Add } from '@mui/icons-material';

export default function QuantityChanger({
  value = 0,
  onIncrease,
  onDecrease,
  onChange,
  disabled = false,
}) {
  return (
    <Grid>
      <IconButton
        sx={{
          border: '1px solid #BDBDBD',
          borderRadius: '0',
          maxHeight: '40px',
        }}
        onClick={onDecrease}
        disabled={disabled}
      >
        <Remove />
      </IconButton>
      <TextField
        size="small"
        sx={{ width: '6ch', textAlign: 'center' }}
        variant="outlined"
        disabled={disabled}
        inputProps={{
          min: 0,
          style: {
            textAlign: 'center',
          },
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          sx: {
            borderRadius: 0,
            textAlign: 'center',
            min: 0,
            borderColor: 'red',
          },
        }}
        value={value}
        onChange={onChange}
      />
      <IconButton
        sx={{
          border: '1px solid #BDBDBD',
          borderRadius: '0',
          maxHeight: '40px',
        }}
        onClick={onIncrease}
        disabled={disabled}
      >
        <Add />
      </IconButton>
    </Grid>
  );
}
