import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Stores
import useAuthStore from "../../store/authStore";
import useUIStore from "../../store/uiStore";

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuthStore();
  const { openAlert } = useUIStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (
        formData.username === "usuario@prueba.com" &&
        formData.password === "123456"
      ) {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVzIjoidXN1YXJpbyIsImFwZWxsaWRvcyI6InBydWViYSIsImZvdG9fZGVfcGVyZmlsIjoiIiwiY29ycmVvIjoidXN1YXJpb0BwcnVlYmEuY29tIiwicm9sIjoicGMiLCJleHAiOjE4Mzg1MTQ2ODB9.xpXiEWohnojdNORcZgaoca6TdFOS92GFt2DRYkuLm2E";
        login(token);
      } else {
        openAlert("Credenciales incorrectas", "error");
      }
    } catch (error) {
      console.error("Error al procesar el token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/paciente/inicio");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Comencemos</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            style={styles.input}
            placeholder="usuario@prueba.com"
          />
        </div>
        <div style={styles.field}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            style={styles.input}
            placeholder="123456"
          />
        </div>
        <button type="submit" disabled={isLoading} style={styles.button}>
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default Login;
