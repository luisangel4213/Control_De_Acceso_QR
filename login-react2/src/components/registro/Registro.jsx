import { useState } from "react";
import { crearUsuario } from "../../services/usuarioService";
import { Link, useNavigate } from "react-router-dom";
import "./Registro.css";

export const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    clave: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await crearUsuario(formData);
      setSuccess("Usuario registrado correctamente");
      setError(null);
      setFormData({ nombre: "", email: "", clave: "" });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="registro-fondo">
      <div className="registro-tarjeta">
        <h2 className="registro-titulo">Registro de Usuario</h2>
        <form className="registro-formulario" onSubmit={handleSubmit}>
          <div className="registro-group">
            <label className="registro-label">Nombre</label>
            <input
              className="registro-input"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="registro-group">
            <label className="registro-label">Email</label>
            <input
              className="registro-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="registro-group">
            <label className="registro-label">Clave</label>
            <input
              className="registro-input"
              type="password"
              name="clave"
              value={formData.clave}
              onChange={handleChange}
              required
            />
          </div>
          <button className="registro-boton" type="submit">
            Registrar
          </button>
        </form>
        {error && <p className="registro-error">{error}</p>}
        {success && <p className="registro-exito">{success}</p>}
        <p className="registro-texto">
          ¿Ya tienes cuenta?{" "}
          <Link className="registro-enlace" to="/">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};