import { useParams, useNavigate } from "react-router-dom";
import "../../styles/adoption/EncuentroConfirmacion.css";
import { useState } from "react";
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
    edad: "2",
    raza: "Bulldog",
    tamaño: "Mediano",
    sexo: "Macho",
    vacunas: "Sí",
    esterilizado: "Sí",
    descripcion: "Bulldog amigable y cariñoso.",
    albergue: "Albergue PawFriends",
    imagenes: [Carlos01, Carlos02, Carlos03],
  },
  {
    id: 2,
    nombre: "Luna",
    edad: "3",
    raza: "Gato siamés",
    tamaño: "Pequeño",
    sexo: "Hembra",
    vacunas: "No",
    esterilizado: "Sí",
    descripcion: "Gata juguetona y curiosa.",
    albergue: "Albergue Luna Nueva",
    imagenes: [Luna01, Luna02, Luna03],
  },
];

const EncuentroConfirmacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mascota = mascotas.find((m) => m.id === parseInt(id)) || mascotas[0];
  const [imagenActual, setImagenActual] = useState(0);

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % mascota.imagenes.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) =>
      (prev - 1 + mascota.imagenes.length) % mascota.imagenes.length
    );
  };

  const hablarConAlbergue = () => {
    navigate(`/chat-albergues?albergue=${encodeURIComponent(mascota.albergue)}`);
  };

  const irAlFormularioAdopcion = () => {
    navigate(`/form-adopcion?mascota=${encodeURIComponent(mascota.nombre)}`);
  };

  const regresar = () => {
    navigate(-1);
  };

  return (
    <div>
      <br />
    <div className="confirmacion-container">
      <div className="perfil-card">
        <div className="imagen-container-encuentro">
          <button className="carrusel-boton-encuentro" onClick={anteriorImagen}>
            {"<"}
          </button>
          <img
            src={mascota.imagenes[imagenActual]}
            alt={`Imagen de ${mascota.nombre}`}
            className="imagen-principal-encuentro"
          />
          <button className="carrusel-boton-encuentro" onClick={siguienteImagen}>
            {">"}
          </button>
          <div className="dots-container-encuentro">
            {mascota.imagenes.map((_, index) => (
              <div
                key={index}
                className={`dot-encuentro ${index === imagenActual ? "active" : ""}`}
                onClick={() => setImagenActual(index)}
              ></div>
            ))}
          </div>
        </div>

        <div className="datos-container">
          <h2>{mascota.nombre}</h2>
          <p>
            <strong>Edad:</strong> {mascota.edad} años
          </p>
          <p>
            <strong>Raza:</strong> {mascota.raza}
          </p>
          <p>
            <strong>Tamaño:</strong> {mascota.tamaño}
          </p>
          <p>
            <strong>Sexo:</strong> {mascota.sexo}
          </p>
          <p>
            <strong>Vacunas completas:</strong> {mascota.vacunas}
          </p>
          <p>
            <strong>Esterilizado:</strong> {mascota.esterilizado}
          </p>
          <p>
            <strong>Descripción:</strong> {mascota.descripcion}
          </p>
          <p>
            <strong>Albergue:</strong> {mascota.albergue}
          </p>
          <div className="acciones">
            <button
              className="boton-amarillo"
              onClick={irAlFormularioAdopcion}
            >
              Adoptar
            </button>
            <button className="boton-naranja" onClick={hablarConAlbergue}>
              Hablar con el albergue
            </button>
            <button className="boton-gris" onClick={regresar}>
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EncuentroConfirmacion;
