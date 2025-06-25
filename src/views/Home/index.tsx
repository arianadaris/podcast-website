import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import HeroSection from './HeroSection';
import MeetTheTeam from './MeetTheTeam';
import WeeklyArtist from './WeeklyArtist';
import MailingList from './MailingList';
import styled from 'styled-components';

const GradientBackground = styled(Box)`
  background: radial-gradient(circle at top left, rgba(30, 32, 75, 0.2) 0%, rgba(0, 0, 0, 0) 50%),
              radial-gradient(circle at bottom right, rgba(30, 32, 75, 0.2) 0%, rgba(0, 0, 0, 0) 50%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const ContentWrapper = styled(Stack)`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, rgba(10, 3, 30, 0.8) 0%, rgba(10, 3, 30, 0) 100%);
    pointer-events: none;
    z-index: -1;
  }
`;

const Home = () => {
  return (
    <>
      <GradientBackground />
      <ContentWrapper width="100%" spacing={{ xs: 12, md: 16 }} pb={12}>
        <HeroSection />
        <WeeklyArtist />
        <MeetTheTeam />
        <MailingList />
      </ContentWrapper>
    </>
  );
};

export default Home;