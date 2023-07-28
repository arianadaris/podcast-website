import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './layouts/Layout';

import HomePage from './pages/Home';

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Routes>
            <Route path="" element={<HomePage />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
