import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirección
import "../../styles/adoption/Encuentros.css";
import Carlos01 from "../../assets/Carlos.jpg";
import Carlos02 from "../../assets/Carlos_02.jpg";
import Carlos03 from "../../assets/Carlos_03.jpg";
import Luna01 from "../../assets/Luna.jpg";
import Luna02 from "../../assets/Luna_02.jpg";
import Luna03 from "../../assets/Luna_03.jpg";

const mascotas = [
  {
    id: 1,
    nombre: "Carlos",
    edad: "2 años",
    descripcion: "Bulldog amigable y cariñoso",
    albergue: "Albergue Happy Paws",
    texto: ["Vacunado", "Esterilizado", "Convive bien con niños"],
    imagenes: [Carlos01, Carlos02, Carlos03],
  },
  {
    id: 2,
    nombre: "Luna",
    edad: "3 años",
    descripcion: "Gata juguetona y curiosa",
    albergue: "Refugio Cat Lovers",
    texto: ["Vacunada", "No convive con perros", "Muy independiente"],
    imagenes: [Luna01, Luna02, Luna03],
  },
];

const Encuentros = () => {
  const [perfilActual, setPerfilActual] = useState(0); // Maneja el perfil actual (mascota)
  const [imagenActual, setImagenActual] = useState(0); // Maneja la imagen actual del carrusel
  const [animando, setAnimando] = useState(false); // Nuevo estado para manejar la animación
  const navigate = useNavigate(); // Inicializa el hook para redirección

  // Cambiar a la siguiente imagen del carrusel
  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % mascotas[perfilActual].imagenes.length);
  };

  // Cambiar a la imagen anterior del carrusel
  const anteriorImagen = () => {
    setImagenActual((prev) =>
      prev === 0 ? mascotas[perfilActual].imagenes.length - 1 : prev - 1
    );
  };

  // Cambiar directamente a una imagen específica
  const cambiarImagen = (index) => {
    setImagenActual(index);
  };

  // Aceptar mascota (Check) y redirigir
  const aceptarMascota = () => {
    navigate(`/confirmacion/${mascotas[perfilActual].id}`); // Redirige al componente EncuentroConfirmacion
  };

  // Rechazar mascota (Equis)
  const rechazarMascota = () => {
    setAnimando(true); // Activa la clase de animación
    setTimeout(() => {
      setPerfilActual((prev) => (prev + 1) % mascotas.length); // Cambia al siguiente perfil
      setAnimando(false); // Reinicia el estado de animación
      setImagenActual(0); // Reinicia el carrusel
    }, 500); // Tiempo debe coincidir con la duración de la animación CSS
  };

  const mascota = mascotas[perfilActual]; // Obtiene la mascota actual

  return (
    <div>
      <br /><br /><br /><br /><br />
    <div className="encuentros-container-encuentro">
      <div className={`perfil-card-encuentro ${animando ? "animating-out-encuentro" : ""}`}>
        <div className="imagen-container-encuentro">
          <button className="carrusel-boton-encuentro" onClick={anteriorImagen}>
            ◀
          </button>
          <img src={mascota.imagenes[imagenActual]} alt={`Imagen de ${mascota.nombre}`} />
          <button className="carrusel-boton-encuentro" onClick={siguienteImagen}>
            ▶
          </button>
          <div className="dots-container-encuentro">
            {mascota.imagenes.map((_, index) => (
              <div
                key={index}
                className={`dot-encuentro ${index === imagenActual ? "active-encuentro" : ""}`}
                onClick={() => cambiarImagen(index)}
              ></div>
            ))}
          </div>
        </div>
        <div className="datos-container-encuentro">
          <h2>
            {mascota.nombre}, {mascota.edad}
          </h2>
          <p>
            <strong>Descripción:</strong> {mascota.descripcion}
          </p>
          <p>
            <strong>Albergue:</strong> {mascota.albergue}
          </p>
          <ul>
            {mascota.texto.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Contenedor centrado de botones */}
        <div className="acciones-encuentro">
          <button className="boton-verde-encuentro" onClick={aceptarMascota}>
            ✔
          </button>
          <button className="boton-rojo-encuentro" onClick={rechazarMascota}>
            ✖
          </button>
        </div>
      </div>
    </div>
    <br /><br /><br /><br /><br /><br />  
    </div>
  );
};

export default Encuentros;
