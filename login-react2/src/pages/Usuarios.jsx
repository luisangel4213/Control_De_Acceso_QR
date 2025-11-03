import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { leerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from "../services/usuarioService";
import { leerRoles } from "../services/rolService";
import { ModalUsuario } from "../components/ui/ModalUsuario";
import "./Usuarios.css";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [usuariosData, rolesData] = await Promise.all([
        leerUsuarios(),
        leerRoles(),
      ]);
      setUsuarios(usuariosData);
      setRoles(rolesData);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const handleCrear = () => {
    setUsuarioSeleccionado(null);
    setMostrarModal(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await eliminarUsuario(id);
        cargarDatos();
      } catch (error) {
        console.error("Error eliminando usuario:", error);
      }
    }
  };

  const handleGuardar = async (usuario) => {
    try {
      if (usuario.id_usuario) {
        await actualizarUsuario(usuario.id_usuario, usuario);
      } else {
        await crearUsuario(usuario);
      }
      setMostrarModal(false);
      cargarDatos();
    } catch (error) {
      console.error("Error guardando usuario:", error);
    }
  };

  return (
    <Layout>
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h1>Gestión de Usuarios</h1>
          <button className="btn-crear" onClick={handleCrear}>
            Crear Usuario
          </button>
        </div>

        <div className="usuarios-list">
          {usuarios.map((usuario) => (
            <div key={usuario.id_usuario} className="usuario-card">
              <div className="usuario-info">
                <h3>{usuario.nombre}</h3>
                <p>Email: {usuario.email}</p>
                <p>Rol: {usuario.rol}</p>
              </div>
              <div className="usuario-actions">
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(usuario)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => handleEliminar(usuario.id_usuario)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mostrarModal && (
        <ModalUsuario
          onClose={() => setMostrarModal(false)}
          onSave={handleGuardar}
          usuarioSeleccionado={usuarioSeleccionado}
          roles={roles}
        />
      )}
    </Layout>
  );
};