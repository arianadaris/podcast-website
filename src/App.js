import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './layouts/Layout';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import EpisodesPage from './pages/Episodes';
import ArtistsPage from './pages/Artists';
import ReviewsPage from './pages/Reviews';
import ContactPage from './pages/Contact';

function App() {
  return (
    <div className="App">
        <Router>
          <Layout>
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="about-808s" element={<AboutPage />} />
              <Route path="episodes" element={<EpisodesPage />} />
              <Route path="artists" element={<ArtistsPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
