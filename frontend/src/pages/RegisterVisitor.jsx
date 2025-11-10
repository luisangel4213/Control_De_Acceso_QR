import React, { useState } from 'react'

export default function RegisterVisitor() {
  const [form, setForm] = useState({
    tipoIdentidad: 'Cédula de Ciudadanía',
    documento: '',
    nombre: '',
    apellido: '',
    destino: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Invitado registrado y código QR generado (simulado)')
  }

  return (
    <div className="register-wrapper">
      <h2>Registro de Invitados</h2>
      <p className="muted-text">Registra un invitado y genera un código QR temporal válido por 2 horas</p>

      <div className="info-box">
        <p>
          <strong>ℹ️ El código QR generado será válido por 2 horas</strong><br />
          desde el momento de creación. Se enviarán alertas cuando el tiempo esté por expirar.
        </p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Identidad *</label>
            <select name="tipoIdentidad" value={form.tipoIdentidad} onChange={handleChange}>
              <option>Cédula de Ciudadanía</option>
              <option>Tarjeta de Identidad</option>
              <option>Cédula de Extranjería</option>
            </select>
          </div>

          <div className="form-group">
            <label>Número de Documento *</label>
            <input
              name="documento"
              type="text"
              placeholder="Ej: 1234567890"
              value={form.documento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nombre *</label>
            <input
              name="nombre"
              placeholder="Nombre del invitado"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido *</label>
            <input
              name="apellido"
              placeholder="Apellido del invitado"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>¿Hacia dónde se dirige? *</label>
          <input
            name="destino"
            placeholder="Ej: Salón 201, Oficina de Dirección, Biblioteca"
            value={form.destino}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn-primary" type="submit">🧾 Registrar Invitado y Generar QR</button>
      </form>
    </div>
  )
}
