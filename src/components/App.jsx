import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Authentication from './Authentication'
import Dashboard from './Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  );
}
