import React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type CustomButtonProps = ButtonProps & {
  label: string;
  isSpaceBetween?: boolean;
  children: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({ label, children, isSpaceBetween = false, ...props }) => {
  return (
    <Button sx={{ width: isSpaceBetween ? '100%' : 'fit-content' }} {...props}>
        <Stack 
          direction="row" 
          justifyContent={isSpaceBetween ? 'space-between' : 'flex-start'} 
          alignItems="center" 
          spacing={2}
          width={isSpaceBetween ? '100%' : 'fit-content'}
        >
          <Typography variant="h6" color="text.primary">{label}</Typography>
          {children}
        </Stack>
    </Button>
  );
};

export default CustomButton;