import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { featureFlags } from './config/featureFlags';

// Public pages
import LandingPage from './views/LandingPage';
import MainPage from './views/MainPage';
import EpisodesPage from './views/EpisodesPage';
import ContactPage from './views/ContactPage';
import TeamPage from './views/TeamPage';
import InterviewsPage from './views/InterviewsPage';
import EventsPage from './views/EventsPage';
import PersonPage from './views/PersonPage';
import NominationsPage from './views/NominationsPage';

// Admin pages
import LoginPage from './views/admin/LoginPage';
import DashboardPage from './views/admin/DashboardPage';
import TeamListPage from './views/admin/TeamListPage';
import TeamFormPage from './views/admin/TeamFormPage';
import InterviewListPage from './views/admin/InterviewListPage';
import InterviewFormPage from './views/admin/InterviewFormPage';
import EventListPage from './views/admin/EventListPage';
import EventFormPage from './views/admin/EventFormPage';
import NominationListPage from './views/admin/NominationListPage';
import NominationSettingsPage from './views/admin/NominationSettingsPage';

import { fetchEpisodes } from './services/rssService';

function App() {
  // Prefetch episodes when app loads for better performance
  useEffect(() => {
    // Prefetch episodes in background (won't block UI)
    fetchEpisodes().catch(err => {
      // Silently fail - episodes will load when user visits EpisodesPage
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/episodes" element={<EpisodesPage />} />
              {featureFlags.showContactPage && (
                <Route path="/contact" element={<ContactPage />} />
              )}
              <Route path="/team" element={<TeamPage />} />
              <Route path="/interviews" element={<InterviewsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/nominations" element={<NominationsPage />} />
              <Route path="/person/:personName" element={<PersonPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Team Management */}
              <Route
                path="/admin/team"
                element={
                  <ProtectedRoute>
                    <TeamListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/team/new"
                element={
                  <ProtectedRoute>
                    <TeamFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/team/edit/:id"
                element={
                  <ProtectedRoute>
                    <TeamFormPage />
                  </ProtectedRoute>
                }
              />

              {/* Interview Management */}
              <Route
                path="/admin/interviews"
                element={
                  <ProtectedRoute>
                    <InterviewListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/interviews/new"
                element={
                  <ProtectedRoute>
                    <InterviewFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/interviews/edit/:id"
                element={
                  <ProtectedRoute>
                    <InterviewFormPage />
                  </ProtectedRoute>
                }
              />

              {/* Event Management */}
              <Route
                path="/admin/events"
                element={
                  <ProtectedRoute>
                    <EventListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/events/new"
                element={
                  <ProtectedRoute>
                    <EventFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/events/edit/:id"
                element={
                  <ProtectedRoute>
                    <EventFormPage />
                  </ProtectedRoute>
                }
              />

              {/* Nomination Management */}
              <Route
                path="/admin/nominations"
                element={
                  <ProtectedRoute>
                    <NominationListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/nomination-settings"
                element={
                  <ProtectedRoute>
                    <NominationSettingsPage />
                  </ProtectedRoute>
                }
              />

              {/* Redirect any unknown routes to landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
