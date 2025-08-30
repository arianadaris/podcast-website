import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import LandingPage from './views/LandingPage';
import MainPage from './views/MainPage';
import EpisodesPage from './views/EpisodesPage';
import ContactPage from './views/ContactPage';
import TeamPage from './views/TeamPage';
import InterviewsPage from './views/InterviewsPage';
import EventsPage from './views/EventsPage';
import PersonPage from './views/PersonPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'main' | 'episodes' | 'contact' | 'team' | 'interviews' | 'events' | 'person'>('landing');
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');

  const handleEnter = () => {
    setCurrentPage('main');
  };

  const handleBack = () => {
    setCurrentPage('landing');
  };

  const handleNavigateToEpisodes = () => {
    setCurrentPage('episodes');
  };

  const handleNavigateToContact = () => {
    setCurrentPage('contact');
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  const handleNavigateToTeam = () => {
    setCurrentPage('team');
  };

  const handleNavigateToInterviews = () => {
    setCurrentPage('interviews');
  };

  const handleNavigateToEvents = () => {
    setCurrentPage('events');
  };

  const handleNavigateToPerson = (personId: string) => {
    setSelectedPersonId(personId);
    setCurrentPage('person');
  };

  const handleBackToTeam = () => {
    setCurrentPage('team');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {currentPage === 'landing' ? (
          <LandingPage onEnter={handleEnter} />
        ) : currentPage === 'main' ? (
          <MainPage 
            onBack={handleBack} 
            onNavigateToEpisodes={handleNavigateToEpisodes}
            onNavigateToContact={handleNavigateToContact}
            onNavigateToTeam={handleNavigateToTeam}
            onNavigateToInterviews={handleNavigateToInterviews}
            onNavigateToEvents={handleNavigateToEvents}
          />
        ) : currentPage === 'episodes' ? (
          <EpisodesPage onBack={handleBackToMain} />
        ) : currentPage === 'contact' ? (
          <ContactPage onBack={handleBackToMain} />
        ) : currentPage === 'team' ? (
          <TeamPage onBack={handleBackToMain} onNavigateToPerson={handleNavigateToPerson} />
        ) : currentPage === 'interviews' ? (
          <InterviewsPage onBack={handleBackToMain} onNavigateToPerson={handleNavigateToPerson} />
        ) : currentPage === 'events' ? (
          <EventsPage onBack={handleBackToMain} />
        ) : currentPage === 'person' ? (
          <PersonPage personId={selectedPersonId} onBack={handleBackToTeam} onNavigateToPerson={handleNavigateToPerson} />
        ) : null}
      </div>
    </ThemeProvider>
  );
}

export default App;
