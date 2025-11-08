import React from 'react'

export default function Reports(){
  const visits = [
    { id: 1, username: 'alice', full_name: 'Alice Pérez', type: 'in', recorded_at: '2025-11-08T09:10:00Z' },
    { id: 2, username: 'bob', full_name: 'Bob Gómez', type: 'out', recorded_at: '2025-11-08T08:45:00Z' }
  ]

  return (
    <div>
      <h3>Reportes</h3>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>Exportar reporte por rango de fechas (simulado)</div>
          <div>
            <input type="date" />
            <input type="date" style={{ marginLeft: 8 }} />
            <button className="btn-sm" style={{ marginLeft: 8 }}>Exportar</button>
          </div>
        </div>
        <table className="table">
          <thead><tr><th>ID</th><th>Usuario</th><th>Nombre</th><th>Tipo</th><th>Fecha</th></tr></thead>
          <tbody>
            {visits.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.username}</td>
                <td>{v.full_name}</td>
                <td>{v.type}</td>
                <td>{new Date(v.recorded_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
