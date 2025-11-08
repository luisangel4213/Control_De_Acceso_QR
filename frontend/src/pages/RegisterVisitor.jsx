import React, { useState } from 'react'

export default function RegisterVisitor(){
  const [form, setForm] = useState({ username: '', full_name: '', note: '' })
  const [ok, setOk] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    // purely visual: show success message
    setOk('Visitante registrado (simulado)')
    setForm({ username: '', full_name: '', note: '' })
  }

  return (
    <div>
      <h3>Registrar visitante</h3>
      <form className="card" onSubmit={submit}>
        <label>Documento / Código</label>
        <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <label>Nombre completo</label>
        <input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
        <label>Nota</label>
        <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
        <button className="btn-primary" type="submit">Registrar</button>
        {ok && <div className="muted">{ok}</div>}
      </form>
    </div>
  )
}
