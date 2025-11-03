const API_URL = "http://localhost:3000/api/rol-permiso";

export const leerRolPermisos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener rol-permisos");
  return res.json();
};

export const leerPermisosDeRol = async (idRol) => {
  const res = await fetch(`${API_URL}/rol/${idRol}`);
  if (!res.ok) throw new Error("Error al obtener permisos del rol");
  return res.json();
};

export const leerRolPermisoPorId = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener rol-permiso");
  return res.json();
};

export const crearRolPermiso = async (id_rol, permiso_id) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_rol, permiso_id }),
  });
  if (!res.ok) throw new Error("Error al asignar permiso a rol");
  return res.json();
};

export const actualizarRolPermiso = async (id, { id_rol, permiso_id }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_rol, permiso_id }),
  });
  if (!res.ok) throw new Error("Error al actualizar rol-permiso");
  return res.json();
};

export const eliminarRolPermiso = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar rol-permiso");
  return res.json();
};