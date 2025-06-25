import MailingListForm from './MailingListForm';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MailingSection = styled(Stack)`
    background: radial-gradient(82.06% 70.78% at 82.43% 22.96%, rgba(8, 134, 231, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(67.16% 96.02% at 9.44% 14.73%, rgba(8, 134, 231, 0.45) 0%, rgba(0, 0, 0, 0.00) 100%), #02030F;
    background-position: 100% 100%;
    border-radius: 0 0 50px 50px;
`;

const MailingList = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <MailingSection spacing={2} py={8} px={isMobile ? 4 : 16} width="97.5%" alignSelf="center">
            <Typography variant='h6' sx={{ lineHeight: 0.8 }}>Join Our Mailing List</Typography>
            <Typography variant='h1'>Stay up to date with 808s!</Typography>
            <MailingListForm />
        </MailingSection>
    );
};

export default MailingList;