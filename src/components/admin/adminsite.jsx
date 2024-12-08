import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ManagePets from "./managepets"; // Componente de mascotas
import Preguntas from "./preguntas"; // Componente de preguntas
import Solicitudes from "./solicitudes"; // Componente de solicitudes
import "../../styles/admin/adminsite.css";

const AdminSite = ({ user }) => {
  const [activeComponent, setActiveComponent] = useState("none");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!user || user.tipo_usuario !== "albergue") {
      alert("No tienes permisos para acceder a este panel.");
      return;
    }
  }, [user]);

  const handleComponentChange = (component) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveComponent(component);
      setIsAnimating(false);
    }, 400);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "managePets":
        return <ManagePets />;
      case "manageQuestions":
        return <Preguntas />;
      case "viewRequests":
        return <Solicitudes />;
      default:
        return <div>Selecciona una opción del menú para comenzar</div>;
    }
  };

  return (
    <div>
      <br /><br /><br /><br /><br /><br />
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
    <br /><br /><br />
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
