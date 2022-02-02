import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SignInPage from './screens/User/SignInPage/SignInPage';
import SignUpPage from './screens/User/SignUpPage/SignUpPage';
import UserLandingPage from './screens/User/UserLandingPage/UserLandingPage';
import VendorLandingPage from './screens/Vendor/VendorLandingPage/VendorLandingPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verifyAccount" element={<SignUpPage />} />

        <Route path="/vendor" element={<VendorLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
