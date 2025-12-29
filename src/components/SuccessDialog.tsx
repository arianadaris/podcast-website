import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  title = 'Success!',
  message = 'Your submission was successful.',
  buttonText = 'OK',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(187, 222, 251)',
          border: '2px solid black',
          borderRadius: 0,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircle
            sx={{
              fontSize: 80,
              color: 'success.main',
            }}
          />
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            fontSize: '1.1rem',
            mb: 2,
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'primary.main',
            color: 'black',
            border: '2px solid black',
            borderRadius: 0,
            px: 4,
            py: 1.5,
            fontWeight: 700,
            '&:hover': {
              backgroundColor: 'primary.light',
            },
            transition: 'all 0.2s',
          }}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;

