import { useState, useEffect } from "react";
import "./ModalRolPermiso.css";

export const ModalRolPermiso = ({
  onClose,
  onSave,
  roles = [],
  permisos = [],
  relacionSeleccionada,
}) => {
  const [idRol, setIdRol] = useState("");
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

  useEffect(() => {
    if (relacionSeleccionada) {
      setIdRol(Number(relacionSeleccionada.id_rol || relacionSeleccionada.idRol || ""));
      setPermisosSeleccionados(
        (relacionSeleccionada.permisosSeleccionados || []).map((s) => Number(s))
      );
    } else {
      setIdRol("");
      setPermisosSeleccionados([]);
    }
  }, [relacionSeleccionada]);

  const handleCheck = (idPermiso) => {
    setPermisosSeleccionados((prev) =>
      prev.includes(idPermiso)
        ? prev.filter((p) => p !== idPermiso)
        : [...prev, idPermiso]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id_rol: Number(idRol),
      permisosSeleccionados,
    });
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenedor">
        <h2 className="modal-titulo">
          {relacionSeleccionada ? "Editar Rol-Permisos" : "Crear Rol-Permisos"}
        </h2>
        <form className="modal-formulario" onSubmit={handleSubmit}>
          <div className="modal-section">
            <label className="modal-label">Rol</label>
            <select
              className="modal-select"
              value={idRol}
              onChange={(e) => setIdRol(e.target.value)}
              required
            >
              <option value="">Selecciona un rol</option>
              {roles.map((rol) => (
                <option key={rol.id_rol} value={rol.id_rol}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-section">
            <label className="modal-label">Permisos</label>
            <div className="modal-lista-permisos">
              {permisos.map((permiso) => (
                <div key={permiso.id_permiso} className="modal-item-permiso">
                  <input
                    type="checkbox"
                    className="modal-checkbox"
                    checked={permisosSeleccionados.includes(permiso.id_permiso)}
                    onChange={() => handleCheck(permiso.id_permiso)}
                  />
                  <span>{permiso.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-acciones">
            <button
              type="button"
              className="modal-boton-cancelar"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="modal-boton-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};