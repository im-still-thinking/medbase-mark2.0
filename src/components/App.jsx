import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Auth/Signup';
import Authentication from './Auth/Authentication'
import Dashboard from './Dashboard';
import Landing from './Landing';
import Error from './Error'

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/auth" element={<Authentication />} />
      <Route exact path="/signup" element={<SignUp/>} />
      <Route exact path="/dashboard" element={<Dashboard />}/>
      <Route exact path="/error" element={<Error />}/>
    </Routes>
  );
}
