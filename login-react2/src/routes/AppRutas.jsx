import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Login } from "../components/login/Login";
import { Registro } from "../components/registro/Registro";
import { Principal } from "../pages/Principal";
import { Bienvenido } from "../pages/Bienvenido";
import { Usuarios } from "../pages/Usuarios";
import { Roles } from "../pages/Roles";
import { Permisos } from "../pages/Permisos";
import { RolPermisos } from "../pages/RolPermisos";

// ✅ Componente de protección de rutas
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/" />; // Redirige al login si no hay usuario
  if (allowedRoles && !allowedRoles.includes(user.rol)) return <Bienvenido />; // Rol no permitido

  return children; // ✅ Renderiza el contenido permitido
};

// ✅ Definición de las rutas
export const AppRutas = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/registro" element={<Registro />} />

    {/* Solo para administrador */}
    <Route
      path="/principal"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <Principal />
        </PrivateRoute>
      }
    />
    <Route
      path="/usuarios"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <Usuarios />
        </PrivateRoute>
      }
    />
    <Route
      path="/roles"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <Roles />
        </PrivateRoute>
      }
    />
    <Route
      path="/permisos"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <Permisos />
        </PrivateRoute>
      }
    />
    <Route
      path="/rol-permisos"
      element={
        <PrivateRoute allowedRoles={["Administrador"]}>
          <RolPermisos />
        </PrivateRoute>
      }
    />

    {/* Todos los usuarios logueados */}
    <Route
      path="/bienvenido"
      element={
        <PrivateRoute>
          <Bienvenido />
        </PrivateRoute>
      }
    />
  </Routes>
);
