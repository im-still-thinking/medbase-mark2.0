import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Auth/Signup';
import Authentication from './Auth/Authentication'
import Dashboard from './Dashboard';
import Landing from './Landing';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  );
}
