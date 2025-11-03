import { useAuthContext } from "../context/AuthContext";
import { Layout } from "../components/layout/Layout";

export const Principal = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
      <h1>Página Principal</h1>
      <p>Bienvenido, {user?.nombre}!</p>
      <p>Tu rol es: {user?.rol}</p>
    </Layout>
  );
};