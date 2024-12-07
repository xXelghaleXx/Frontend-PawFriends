import { useState, useEffect } from 'react'; // Importar useState y useEffect
import { Link } from 'react-router-dom';
import Logo from '../../assets/PawFriends_Logo.webp';  // Importar logo
import ProfileIcon from '../../assets/user.png';       // Importar icono de usuario
import Slidebar from './Slidebar';                 // Importar el slidebar
import UserMenu from '../users/UserMenu';                 // Importar el UserMenu
import "../../styles/shared/navbar.css";
import "../../styles/global/generalStyles.css";

const Navbar = () => {
  // Estado para controlar si el menú de usuario está abierto
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Estado para manejar el estilo del navbar en scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Función para alternar el menú de usuario
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen); // Alterna el estado entre true y false
  };

  // useEffect para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Cambiar estado a scrolled si el scroll es mayor a 50px
      } else {
        setIsScrolled(false); // Volver al estado inicial si no hay scroll
      }
    };

    // Escuchar el evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpieza del evento de scroll
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Slidebar deslizante */}
      <Slidebar />

      {/* Logo centrado con enlace */}
      <div className="navbar-center">
        <Link to="/welcome">
          <img src={Logo} alt="PawFriends Logo" />
        </Link>
      </div>

      {/* Icono de perfil a la derecha con toggle */}
      <div className="navbar-right">
        <img
          src={ProfileIcon}
          alt="Perfil"
          className="profile-icon"
          onClick={toggleUserMenu} // Aquí alterna el menú al hacer clic
        />
      </div>

      {/* Menú de usuario desplegable */}
      {isUserMenuOpen && <UserMenu isOpen={isUserMenuOpen} toggleMenu={toggleUserMenu} />}
    </nav>
  );
};

export default Navbar;

