import { useAuthContext } from "../context/AuthContext";
import { Layout } from "../components/layout/Layout";

export const Bienvenido = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
      <h1>Bienvenido, {user?.nombre}!</h1>
      <p>Has iniciado sesión correctamente.</p>
    </Layout>
  );
};