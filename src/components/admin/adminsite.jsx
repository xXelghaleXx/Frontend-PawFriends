import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ManagePets from "./managepets"; // Importa el componente
import "../../styles/admin/adminsite.css";

const AdminSite = ({ user }) => {
  const [activeComponent, setActiveComponent] = useState("none"); // Controla el componente activo
  const [isAnimating, setIsAnimating] = useState(false); // Controla la animación

  useEffect(() => {
    // Verifica si el usuario es un albergue; si no, redirige al login
    if (!user || user.tipo_usuario !== "albergue") {
      alert("No tienes permisos para acceder a este panel.");
      return;
    }
  }, [user]);

  const handleComponentChange = (component) => {
    // Maneja la animación al cambiar de componente
    setIsAnimating(true);
    setTimeout(() => {
      setActiveComponent(component);
      setIsAnimating(false);
    }, 400); // Duración de la animación (en milisegundos)
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "managePets":
        return <ManagePets />;
      case "manageQuestions":
        return <div>Componente de preguntas de adopción</div>;
      case "viewRequests":
        return <div>Componente de solicitudes</div>;
      default:
        return <div>Selecciona una opción del menú para comenzar</div>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="admin-site-container">
        <h1>Panel de Administración de Albergues</h1>
        <div className="admin-options">
          <button
            className="admin-button"
            onClick={() => handleComponentChange("managePets")}
          >
            Mis Mascotas
          </button>
          <button
            className="admin-button"
            onClick={() => handleComponentChange("manageQuestions")}
          >
            Preguntas de Adopción
          </button>
          <button
            className="admin-button"
            onClick={() => handleComponentChange("viewRequests")}
          >
            Solicitudes
          </button>
        </div>

        <div
          className={`admin-content ${
            isAnimating ? "content-hidden" : "content-visible"
          }`}
        >
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

AdminSite.propTypes = {
  user: PropTypes.shape({
    tipo_usuario: PropTypes.string.isRequired,
    nombre: PropTypes.string,
    correo: PropTypes.string,
  }),
};

export default AdminSite;
