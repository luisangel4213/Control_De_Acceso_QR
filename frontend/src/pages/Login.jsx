import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()

    // Simulación de autenticación básica
    if (username === 'Administrador' && password === '123456') {
      localStorage.setItem('rol', 'Administrador')
      setMsg('Inicio de sesión exitoso (Administrador)')
      setTimeout(() => navigate('/admin'), 800)
    } else if (username === 'Guarda' && password === '123456') {
      localStorage.setItem('rol', 'Guarda')
      setMsg('Inicio de sesión exitoso (Guarda)')
      setTimeout(() => navigate('/guarda'), 800)
    } else {
      setMsg('❌ Credenciales incorrectas')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-circle">🔳</div>
          <h2>Control de Acceso QR</h2>
          <p className="muted-text">
            Ingresa tus credenciales para acceder al sistema
          </p>
        </div>

        <form onSubmit={submit} className="login-form">
          <label>Usuario</label>
          <input
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn-login" type="submit">
            🗝️ Iniciar Sesión
          </button>

          {msg && <div className="login-msg">{msg}</div>}
        </form>

        <div className="login-info">
          <p><strong>Usuarios de prueba:</strong></p>
          <ul>
            <li><strong>Administrador</strong> (contraseña: 123456)</li>
            <li><strong>Guarda</strong> (contraseña: 123456)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
