import { Box, Grid, Modal, Typography } from '@mui/material';
import React from 'react';
import KeepBuyingButton from './KeepBuyingButton';
import GoToCartButton from './GoToCartButton';

export default function BuyOptionsModal({ open, handleClose }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: 400,
    bgcolor: 'background.paper',
    color: 'text.secondary',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: '400px' }}>
          <Typography variant="h5">Como deseja prosseguir?</Typography>
          <Grid display="flex" gap={2}>
            <KeepBuyingButton color="info" href="#" onClick={handleClose} />
            <GoToCartButton color="info" />
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
