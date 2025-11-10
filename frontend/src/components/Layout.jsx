import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  const [rol, setRol] = useState(null)

  useEffect(() => {
    const storedRol = localStorage.getItem('rol')
    if (!storedRol) {
      navigate('/login')
    } else {
      setRol(storedRol)
    }
  }, [navigate])

  const logout = () => {
    localStorage.removeItem('rol')
    navigate('/login')
  }

  if (!rol) {
    return null // Espera a que se cargue el rol antes de renderizar
  }

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="logo">Control de Acceso QR</div>
        <div className="muted">Rol: {rol}</div>
        <nav>
          {rol === 'Administrador' && (
            <>
              <Link to="/admin">📊 Dashboard</Link>
              <Link to="/admin/users">👥 Gestión de usuarios</Link>
              <Link to="/admin/reports">📄 Reportes</Link>
            </>
          )}

          {rol === 'Guarda' && (
            <>
              <Link to="/guarda">📷 Lector QR</Link>
              <Link to="/guarda/register">🧾 Registro de visitantes</Link>
            </>
          )}
        </nav>
        <button className="btn-ghost" onClick={logout}>
          Cerrar sesión
        </button>
      </aside>

      <main className="main">
        <header className="header">
          <h2>{rol === 'Administrador' ? 'Panel del Administrador' : 'Panel del Guarda'}</h2>
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
