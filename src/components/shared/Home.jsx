import { Link } from "react-router-dom";
import "../../styles/shared/Home.css"; // Asegúrate de tener estilos básicos para la página

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Bienvenido a PawFriends</h1>
        <p className="home-subtitle">Conectando mascotas con familias amorosas ❤️</p>
      </header>
      <div className="home-content">
        <section className="home-section">
          <h2>¿Qué hacemos?</h2>
          <p>
            PawFriends es una plataforma dedicada a facilitar la adopción de
            mascotas, ayudando a los albergues a encontrar hogares para perros
            y gatos.
          </p>
          <Link to="/albergues" className="home-button">
            Explorar Albergues
          </Link>
        </section>
        <section className="home-section">
          <h2>Donaciones</h2>
          <p>
            Ayuda a los albergues a cuidar de las mascotas mediante donaciones
            de productos o dinero.
          </p>
          <Link to="/donaciones" className="home-button">
            Haz una Donación
          </Link>
        </section>
        <section className="home-section">
          <h2>Encuentra tu Compañero</h2>
          <p>
            Explora nuestras opciones de adopción y encuentra el compañero ideal
            para ti.
          </p>
          <Link to="/mascotas" className="home-button">
            Buscar Mascotas
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home;
