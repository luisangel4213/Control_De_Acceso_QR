import React, { useState } from 'react'

export default function QRScanner(){
  const [scanning, setScanning] = useState(false)
  const [msg, setMsg] = useState('')

  const fakeScan = () => {
    setMsg('QR leído: {"type":"user","username":"alice"} (simulado)')
  }

  return (
    <div>
      <h3>Lectura QR</h3>
      <div className="card">
        <div style={{ width: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: 8 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 220, height: 220, background: '#fff', borderRadius: 8, display: 'inline-block', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 12 }}>
              {/* Placeholder for camera view */}
            </div>
            <div className="muted">Área del escáner (placeholder)</div>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn-primary" onClick={() => { setScanning(s => !s); setMsg('Escáner ' + (scanning ? 'detenido (simulado)' : 'activo (simulado)')) }}>{scanning ? 'Detener' : 'Iniciar escáner'}</button>
          <button className="btn-sm" style={{ marginLeft: 8 }} onClick={fakeScan}>Simular lectura</button>
        </div>
        <div style={{ marginTop: 8 }}>{msg}</div>
      </div>
    </div>
  )
}
