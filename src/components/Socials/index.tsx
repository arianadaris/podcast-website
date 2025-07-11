import Stack from '@mui/material/Stack';
import { Icon } from '@iconify/react';
import Link from '../Link';
import styled from 'styled-components';
import { SxProps, Theme } from '@mui/material/styles';

interface SocialsProps {
    sx?: SxProps<Theme>;
}

const StyledStack = styled(Stack)`
    border-color: rgba(255, 255, 255, 0.1);
    border-width: 1px;
    border-style: solid;
    border-radius: 100px;
`;

const Socials = ({ sx }: SocialsProps) => {
    return (
        <StyledStack direction="row" spacing={2} p={1} sx={sx}>
            <Link to="https://instagram.com" hover>
                <Icon icon="mdi:instagram"height="30" />
            </Link>
            <Link to="https://spotify.com" hover>
                <Icon icon="mdi:spotify" height="30" />
            </Link>
            <Link to="https://facebook.com" hover>
                <Icon icon="akar-icons:facebook-fill" height="30" />
            </Link>
        </StyledStack>
    );
};

export default Socials;