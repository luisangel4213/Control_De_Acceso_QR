import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  const logout = () => {
    // purely visual: navigate to login view
    navigate('/login')
  }

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="logo">QR System</div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/users">Gestión de usuarios</Link>
          <Link to="/scanner">Lectura QR</Link>
          <Link to="/register">Registrar visitante</Link>
          <Link to="/reports">Reportes</Link>
        </nav>
        <button className="btn-ghost" onClick={logout}>Cerrar sesión</button>
      </aside>
      <main className="main">
        <header className="header">
          <h2>Panel de control</h2>
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
