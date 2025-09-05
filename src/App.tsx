import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Main dashboard */}
            <Route path="/main" element={<MainPage />} />
            
            {/* Individual pages */}
            <Route path="/episodes" element={<EpisodesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/interviews" element={<InterviewsPage />} />
            <Route path="/events" element={<EventsPage />} />
            
            {/* Person detail page */}
            <Route path="/person/:personName" element={<PersonPage />} />
            
            {/* Redirect any unknown routes to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
