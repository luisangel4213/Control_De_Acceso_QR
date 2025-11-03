import { useState, useEffect } from "react";
import "./ModalUsuario.css";

export const ModalUsuario = ({
  onClose,
  onSave,
  usuarioSeleccionado,
  roles = [],
}) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [idRol, setIdRol] = useState("");

  useEffect(() => {
    if (usuarioSeleccionado) {
      setNombre(usuarioSeleccionado.nombre || "");
      setEmail(usuarioSeleccionado.email || "");
      setClave("");
      setIdRol(usuarioSeleccionado.id_rol || "");
    } else {
      setNombre("");
      setEmail("");
      setClave("");
      setIdRol("");
    }
  }, [usuarioSeleccionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nombre,
      email,
      id_rol: Number(idRol),
    };
    if (clave) {
      data.clave = clave;
    }
    if (usuarioSeleccionado) {
      onSave({ ...usuarioSeleccionado, ...data });
    } else {
      onSave(data);
    }
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenedor">
        <h2 className="modal-titulo">
          {usuarioSeleccionado ? "Editar Usuario" : "Crear Usuario"}
        </h2>
        <form className="modal-formulario" onSubmit={handleSubmit}>
          <input
            className="modal-entrada"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            required
          />
          <input
            className="modal-entrada"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="modal-entrada"
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder={usuarioSeleccionado ? "Nueva clave (opcional)" : "Clave"}
            required={!usuarioSeleccionado}
          />
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