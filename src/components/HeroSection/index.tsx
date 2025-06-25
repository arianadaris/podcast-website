import Stack, { StackProps } from '@mui/material/Stack';
import styled from 'styled-components';

const StyledHeroSection = styled(Stack)`
    background: radial-gradient(82.06% 70.78% at 82.43% 22.96%, rgba(8, 134, 231, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(91.61% 67.45% at 61.04% 103.32%, rgba(231, 8, 142, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(67.16% 96.02% at 9.44% 14.73%, rgba(8, 134, 231, 0.25) 0%, rgba(0, 0, 0, 0.00) 100%), #02030F;
`;

type HeroSectionProps = StackProps & {
    children: React.ReactNode;
};

const HeroSection = ({ children }: HeroSectionProps) => {
    return (
        <StyledHeroSection>
            {children}
        </StyledHeroSection>
    );
};

export default HeroSection;