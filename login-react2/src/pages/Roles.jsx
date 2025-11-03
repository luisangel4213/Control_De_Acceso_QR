import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { leerRoles, crearRol, actualizarRol, eliminarRol } from "../services/rolService";
import { ModalRol } from "../components/ui/ModalRol";
import "./Roles.css";

export const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      const data = await leerRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error cargando roles:", error);
    }
  };

  const handleCrear = () => {
    setRolSeleccionado(null);
    setMostrarModal(true);
  };

  const handleEditar = (rol) => {
    setRolSeleccionado(rol);
    setMostrarModal(true);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este rol?")) {
      try {
        await eliminarRol(id);
        cargarRoles();
      } catch (error) {
        console.error("Error eliminando rol:", error);
      }
    }
  };

  const handleGuardar = async (rol) => {
    try {
      if (rol.id_rol) {
        await actualizarRol(rol.id_rol, rol);
      } else {
        await crearRol(rol);
      }
      setMostrarModal(false);
      cargarRoles();
    } catch (error) {
      console.error("Error guardando rol:", error);
    }
  };

  return (
    <Layout>
      <div className="roles-container">
        <div className="roles-header">
          <h1>Gestión de Roles</h1>
          <button className="btn-crear" onClick={handleCrear}>
            Crear Rol
          </button>
        </div>

        <div className="roles-list">
          {roles.map((rol) => (
            <div key={rol.id_rol} className="rol-card">
              <div className="rol-info">
                <h3>{rol.nombre}</h3>
              </div>
              <div className="rol-actions">
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(rol)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => handleEliminar(rol.id_rol)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mostrarModal && (
        <ModalRol
          onClose={() => setMostrarModal(false)}
          onSave={handleGuardar}
          rolSeleccionado={rolSeleccionado}
        />
      )}
    </Layout>
  );
};