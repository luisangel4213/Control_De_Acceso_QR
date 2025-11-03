import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { leerPermisos, crearPermiso, actualizarPermiso, eliminarPermiso } from "../services/permisoService";
import { ModalPermiso } from "../components/ui/ModalPermiso";
import "./Permisos.css";

export const Permisos = () => {
  const [permisos, setPermisos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [permisoSeleccionado, setPermisoSeleccionado] = useState(null);

  useEffect(() => {
    cargarPermisos();
  }, []);

  const cargarPermisos = async () => {
    try {
      const data = await leerPermisos();
      setPermisos(data);
    } catch (error) {
      console.error("Error cargando permisos:", error);
    }
  };

  const handleCrear = () => {
    setPermisoSeleccionado(null);
    setMostrarModal(true);
  };

  const handleEditar = (permiso) => {
    setPermisoSeleccionado(permiso);
    setMostrarModal(true);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este permiso?")) {
      try {
        await eliminarPermiso(id);
        cargarPermisos();
      } catch (error) {
        console.error("Error eliminando permiso:", error);
      }
    }
  };

  const handleGuardar = async (permiso) => {
    try {
      if (permiso.id_permiso) {
        await actualizarPermiso(permiso.id_permiso, permiso);
      } else {
        await crearPermiso(permiso);
      }
      setMostrarModal(false);
      cargarPermisos();
    } catch (error) {
      console.error("Error guardando permiso:", error);
    }
  };

  return (
    <Layout>
      <div className="permisos-container">
        <div className="permisos-header">
          <h1>Gestión de Permisos</h1>
          <button className="btn-crear" onClick={handleCrear}>
            Crear Permiso
          </button>
        </div>

        <div className="permisos-list">
          {permisos.map((permiso) => (
            <div key={permiso.id_permiso} className="permiso-card">
              <div className="permiso-info">
                <h3>{permiso.nombre}</h3>
                <p>{permiso.descripcion}</p>
              </div>
              <div className="permiso-actions">
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(permiso)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => handleEliminar(permiso.id_permiso)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mostrarModal && (
        <ModalPermiso
          onClose={() => setMostrarModal(false)}
          onSave={handleGuardar}
          permisoSeleccionado={permisoSeleccionado}
        />
      )}
    </Layout>
  );
};