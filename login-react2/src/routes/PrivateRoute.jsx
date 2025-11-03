import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ Children, allowedRoles}) => {
    const { user } = useAuthContext();

    if (!user) return <Navigate to="/" />; //No logueadi
    if (allowedRoles && !allowedRoles.incloudes(user.rol)) return <Navigate to="/bienvenido" />;

    return children;
};