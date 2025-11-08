import React from 'react'

export default function Dashboard(){
  // Placeholder stats
  const stats = [
    { title: 'Usuarios', value: 124 },
    { title: 'Entradas hoy', value: 32 },
    { title: 'Visitantes activos', value: 8 }
  ]
  return (
    <div>
      <h3>Dashboard</h3>
      <div className="cards">
        {stats.map(s => (
          <div key={s.title} className="card small">
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>{s.title}</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18 }} className="card">
        <h4>Actividad reciente</h4>
        <ul>
          <li>09:10 — Alice Pérez entró</li>
          <li>08:45 — Bob Gómez salió</li>
        </ul>
      </div>
    </div>
  )
}
