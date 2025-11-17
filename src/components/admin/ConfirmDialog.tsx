import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { Warning } from '@mui/icons-material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmColor?: 'error' | 'primary';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  confirmColor = 'error',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.light',
          border: '2px solid black',
          borderRadius: 0,
          minWidth: { xs: '90%', sm: 400 },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '2px solid black',
          paddingY: 2,
        }}
      >
        <Warning sx={{ color: confirmColor === 'error' ? '#d32f2f' : '#1976d2' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ paddingY: 3 }}>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: '2px solid black',
          padding: 2,
          gap: 1,
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            color: 'black',
            borderColor: 'black',
            borderRadius: 0,
            border: '2px solid black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'rgba(0,0,0,0.05)',
              border: '2px solid black',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: confirmColor === 'error' ? '#d32f2f' : '#1976d2',
            color: 'white',
            borderRadius: 0,
            border: '2px solid black',
            '&:hover': {
              backgroundColor: confirmColor === 'error' ? '#b71c1c' : '#1565c0',
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

