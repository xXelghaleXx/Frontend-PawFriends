import { useState } from "react";
import "../../styles/admin/solicitudes.css";

const Solicitudes = () => {
  // Estado inicial con solicitudes ficticias
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      adoptante: "Juan Pérez",
      mascota: "Luna (Labrador)",
      fecha: "2024-12-01",
      estado: "Pendiente",
      respuestas: [
        { pregunta: "Pregunta 1", respuesta: "Respuesta 1" },
        { pregunta: "Pregunta 2", respuesta: "Respuesta 2" },
        { pregunta: "Pregunta 3", respuesta: "Respuesta 3" },
      ],
    },
    {
      id: 2,
      adoptante: "Ana Torres",
      mascota: "Max (Bulldog)",
      fecha: "2024-12-02",
      estado: "Pendiente",
      respuestas: [
        { pregunta: "Pregunta 1", respuesta: "Respuesta A" },
        { pregunta: "Pregunta 2", respuesta: "Respuesta B" },
      ],
    },
  ]);

  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  // Función para cambiar el estado de la solicitud a "Aceptada"
  const handleAceptar = () => {
    setSolicitudes(
      solicitudes.map((solicitud) =>
        solicitud.id === selectedSolicitud.id
          ? { ...solicitud, estado: "Aceptada" }
          : solicitud
      )
    );
    setSelectedSolicitud(null);
  };

  // Función para cambiar el estado de la solicitud a "Rechazada"
  const handleRechazar = () => {
    setSolicitudes(
      solicitudes.map((solicitud) =>
        solicitud.id === selectedSolicitud.id
          ? { ...solicitud, estado: "Rechazada" }
          : solicitud
      )
    );
    setSelectedSolicitud(null);
  };

  // Función para manejar el botón "Ver Detalles"
  const handleVerDetalles = (solicitud) => {
    setSelectedSolicitud(solicitud);
  };

  return (
    <div className="solicitudes-container">
      <h1>Solicitudes de Adopción</h1>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        <table className="solicitudes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Adoptante</th>
              <th>Mascota</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id}>
                <td>{solicitud.id}</td>
                <td>{solicitud.adoptante}</td>
                <td>{solicitud.mascota}</td>
                <td>{solicitud.fecha}</td>
                <td>
                  <span
                    className={`estado ${
                      solicitud.estado === "Pendiente"
                        ? "pendiente"
                        : solicitud.estado === "Aceptada"
                        ? "aceptada"
                        : "rechazada"
                    }`}
                  >
                    {solicitud.estado}
                  </span>
                </td>
                <td>
                  <button
                    className="detalles-button"
                    onClick={() => handleVerDetalles(solicitud)}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedSolicitud && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalle de Solicitud</h2>
            <p>
              <strong>Adoptante:</strong> {selectedSolicitud.adoptante}
            </p>
            <p>
              <strong>Mascota:</strong> {selectedSolicitud.mascota}
            </p>
            <h3>Respuestas al Formulario:</h3>
            <ul>
              {selectedSolicitud.respuestas.map((respuesta, index) => (
                <li key={index}>
                  <strong>{respuesta.pregunta}:</strong> {respuesta.respuesta}
                </li>
              ))}
            </ul>
            <div className="modal-actions">
              <button
                className="aceptar-button"
                onClick={handleAceptar}
              >
                Aceptar
              </button>
              <button
                className="rechazar-button"
                onClick={handleRechazar}
              >
                Rechazar
              </button>
              <button
                className="cerrar-button"
                onClick={() => setSelectedSolicitud(null)}
              >
                Volver a la Lista
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Solicitudes;
