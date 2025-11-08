import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Static login: accepts any input and navigates to dashboard.
// Demo credentials (shown below) can be used for visual testing:
// - admin / admin123
// - guard / guard123

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    setMsg('Sesión iniciada (modo estático)')
    setTimeout(() => navigate('/'), 600)
  }

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <h3>Iniciar sesión</h3>
        <div style={{ fontSize: 13, marginBottom: 8 }}>Credenciales demo: <strong>admin/admin123</strong> o <strong>guard/guard123</strong></div>
        <label>Usuario</label>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="usuario" />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="contraseña" />
        <button className="btn-primary" type="submit">Entrar</button>
        {msg && <div className="muted">{msg}</div>}
      </form>
    </div>
  )
}
