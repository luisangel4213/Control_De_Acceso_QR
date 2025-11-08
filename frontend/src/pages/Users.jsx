import React from 'react'

export default function Users(){
  const users = [
    { id: 100, username: 'alice', full_name: 'Alice Pérez', role: 'apprentice' },
    { id: 101, username: 'bob', full_name: 'Bob Gómez', role: 'guest' },
    { id: 0, username: 'admin', full_name: 'Administrador', role: 'admin' }
  ]

  return (
    <div>
      <h3>Gestión de usuarios</h3>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>Lista de usuarios del sistema</div>
          <button className="btn-primary">Crear usuario</button>
        </div>
        <table className="table">
          <thead><tr><th>ID</th><th>Usuario</th><th>Nombre</th><th>Rol</th><th>Acciones</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.full_name}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn-sm">Editar</button>
                  <button className="btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
