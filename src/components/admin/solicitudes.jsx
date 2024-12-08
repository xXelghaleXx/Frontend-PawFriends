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
    },
    {
      id: 2,
      adoptante: "Ana Torres",
      mascota: "Max (Bulldog)",
      fecha: "2024-12-02",
      estado: "Pendiente",
    },
  ]);

  // Función para cambiar el estado de la solicitud a "Aceptada"
  const handleAceptar = (id) => {
    setSolicitudes(
      solicitudes.map((solicitud) =>
        solicitud.id === id ? { ...solicitud, estado: "Aceptada" } : solicitud
      )
    );
  };

  // Función para cambiar el estado de la solicitud a "Rechazada"
  const handleRechazar = (id) => {
    setSolicitudes(
      solicitudes.map((solicitud) =>
        solicitud.id === id ? { ...solicitud, estado: "Rechazada" } : solicitud
      )
    );
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
                  {solicitud.estado === "Pendiente" && (
                    <div className="acciones">
                      <button
                        className="aceptar-button"
                        onClick={() => handleAceptar(solicitud.id)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="rechazar-button"
                        onClick={() => handleRechazar(solicitud.id)}
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Solicitudes;
