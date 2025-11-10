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
      {/* Página de inicio de sesión */}
      <Route path="/login" element={<Login />} />

      {/* Panel del Administrador */}
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Panel del Guarda */}
      <Route path="/guarda" element={<Layout />}>
        <Route index element={<QRScanner />} />
        <Route path="register" element={<RegisterVisitor />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Login />} />
    </Routes>
  )
}
