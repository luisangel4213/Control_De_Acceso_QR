import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { leerRolPermisos, crearRolPermiso, eliminarRolPermiso } from "../services/rolPermisoService";
import { leerRoles } from "../services/rolService";
import { leerPermisos } from "../services/permisoService";
import { ModalRolPermiso } from "../components/ui/ModalRolPermiso";
import "./RolPermisos.css";

export const RolPermisos = () => {
  const [relaciones, setRelaciones] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [relacionSeleccionada, setRelacionSeleccionada] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [relacionesData, rolesData, permisosData] = await Promise.all([
        leerRolPermisos(),
        leerRoles(),
        leerPermisos(),
      ]);
      setRelaciones(relacionesData);
      setRoles(rolesData);
      setPermisos(permisosData);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const handleCrear = () => {
    setRelacionSeleccionada(null);
    setMostrarModal(true);
  };

  const handleEditar = (relacion) => {
    const permisosDeRol = relaciones
      .filter((r) => r.id_rol === relacion.id_rol)
      .map((r) => r.permiso_id);
    setRelacionSeleccionada({
      ...relacion,
      permisosSeleccionados: permisosDeRol,
    });
    setMostrarModal(true);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta relación?")) {
      try {
        await eliminarRolPermiso(id);
        cargarDatos();
      } catch (error) {
        console.error("Error eliminando relación:", error);
      }
    }
  };

  const handleGuardar = async (data) => {
    try {
      const { id_rol, permisosSeleccionados } = data;

      const relacionesExistentes = relaciones.filter((r) => r.id_rol === id_rol);
      for (const rel of relacionesExistentes) {
        await eliminarRolPermiso(rel.id);
      }

      for (const permisoId of permisosSeleccionados) {
        await crearRolPermiso(id_rol, permisoId);
      }

      setMostrarModal(false);
      cargarDatos();
    } catch (error) {
      console.error("Error guardando relación:", error);
    }
  };

  const agruparPorRol = () => {
    const agrupado = {};
    relaciones.forEach((rel) => {
      if (!agrupado[rel.id_rol]) {
        agrupado[rel.id_rol] = {
          rol: roles.find((r) => r.id_rol === rel.id_rol),
          permisos: [],
        };
      }
      const permiso = permisos.find((p) => p.id_permiso === rel.permiso_id);
      if (permiso) {
        agrupado[rel.id_rol].permisos.push(permiso);
      }
    });
    return agrupado;
  };

  const relacionesAgrupadas = agruparPorRol();

  return (
    <Layout>
      <div className="rol-permisos-container">
        <div className="rol-permisos-header">
          <h1>Gestión de Rol-Permisos</h1>
          <button className="btn-crear" onClick={handleCrear}>
            Crear Relación
          </button>
        </div>

        <div className="rol-permisos-list">
          {Object.keys(relacionesAgrupadas).map((idRol) => {
            const grupo = relacionesAgrupadas[idRol];
            return (
              <div key={idRol} className="rol-permisos-card">
                <div className="rol-permisos-info">
                  <h3>Rol: {grupo.rol?.nombre}</h3>
                  <p>Permisos asignados:</p>
                  <ul>
                    {grupo.permisos.map((permiso) => (
                      <li key={permiso.id_permiso}>{permiso.nombre}</li>
                    ))}
                  </ul>
                </div>
                <div className="rol-permisos-actions">
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(grupo.rol)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(idRol)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {mostrarModal && (
        <ModalRolPermiso
          onClose={() => setMostrarModal(false)}
          onSave={handleGuardar}
          roles={roles}
          permisos={permisos}
          relacionSeleccionada={relacionSeleccionada}
        />
      )}
    </Layout>
  );
};