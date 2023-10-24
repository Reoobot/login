import React from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './componet/Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import ProfilePage from './pages/ProfilePage';
import { UserContextProvider } from './componet/UserContext';
import ProfileAccount from './pages/ProfileAccount';

axios.defaults.baseURL = 'https://geode-receptive-adasaurus.glitch.me';

function App() {
  return (
    <UserContextProvider> {/* Debes envolver tu aplicación con el UserContextProvider */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/profileAccount' element={<ProfileAccount />} />

          profileAccount
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
