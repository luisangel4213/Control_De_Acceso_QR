import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import QRScanner from './pages/QRScanner'
import RegisterVisitor from './pages/RegisterVisitor'
import Reports from './pages/Reports'
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="scanner" element={<QRScanner />} />
        <Route path="register" element={<RegisterVisitor />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  )
}
