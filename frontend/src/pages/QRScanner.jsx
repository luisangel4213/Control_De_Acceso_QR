import React from 'react'

export default function QRScanner() {
  return (
    <div className="scanner-wrapper">
      <div className="scanner-section">
        <h2>Escanear Código QR</h2>
        <p className="muted-text">Escanee el código QR del estudiante o invitado</p>

        <div className="camera-box">
          <div className="camera-placeholder">📸 Cámara QR (Simulada)</div>
        </div>

        <div className="manual-entry">
          <input type="text" placeholder="Código QR" />
          <button className="btn-primary">Verificar</button>
        </div>

        <p className="muted-text">Para probar el escáner, copia y pega el código QR desde:</p>
        <ul className="muted-list">
          <li>Un registro de estudiante creado</li>
          <li>Un pase de invitado generado</li>
          <li>El resultado de una carga masiva</li>
        </ul>
      </div>

      <div className="result-section">
        <h2>Resultado del Escaneo</h2>
        <div className="result-box">
          <div className="result-placeholder">
            <p>No hay escaneos recientes</p>
            <p className="muted-text">Escanee un código QR para ver la información</p>
          </div>
        </div>
      </div>
    </div>
  )
}
