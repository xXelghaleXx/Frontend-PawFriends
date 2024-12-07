import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/users/UserMenuStyles.css";

const UserMenu = ({ isOpen, toggleMenu, user }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Cierra el menú al hacer clic fuera de él
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      toggleMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const goToPerfil = () => {
    toggleMenu();
    navigate("/perfil");
  };

  const goToLogin = () => {
    toggleMenu();
    navigate("/login");
  };

  const goToAdminSite = () => {
    if (user?.tipo_usuario === "albergue") {
      toggleMenu();
      navigate("/adminsite");
    } else {
      alert("Solo los albergues pueden acceder al sitio de administración.");
    }
  };

  return (
    <div
      ref={menuRef}
      className={`user-menu ${isOpen ? "menu-open" : "menu-closed"}`}
    >
      <h2>Menú de Usuario</h2>
      <ul>
        <li>
          <button className="menu-button" onClick={goToPerfil}>
            Perfil
          </button>
        </li>
        <li>
          <button className="menu-button" onClick={goToAdminSite}>
            AdminSite
          </button>
        </li>
        <li>
          <button className="menu-button" onClick={goToLogin}>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  user: PropTypes.shape({
    tipo_usuario: PropTypes.string.isRequired,
    nombre: PropTypes.string,
    correo: PropTypes.string,
  }).isRequired,
};

export default UserMenu;
