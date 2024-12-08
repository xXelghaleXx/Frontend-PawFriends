import { useState } from "react";
import "../../styles/admin/preguntas.css";

const Preguntas = () => {
  const [preguntas, setPreguntas] = useState([
    { id: 1, pregunta: "¿Por qué quieres adoptar una mascota?" },
    { id: 2, pregunta: "¿Tienes experiencia previa con mascotas?" },
  ]);

  const [newPregunta, setNewPregunta] = useState("");
  const [editPregunta, setEditPregunta] = useState(null);

  // Función para añadir una nueva pregunta
  const handleAddPregunta = () => {
    if (newPregunta.trim() === "") return alert("La pregunta no puede estar vacía.");
    const newId = preguntas.length > 0 ? preguntas[preguntas.length - 1].id + 1 : 1;
    setPreguntas([...preguntas, { id: newId, pregunta: newPregunta }]);
    setNewPregunta("");
  };

  // Función para iniciar la edición de una pregunta
  const handleEditPregunta = (pregunta) => {
    setEditPregunta({ ...pregunta });
  };

  // Función para actualizar la pregunta editada
  const handleUpdatePregunta = () => {
    if (!editPregunta.pregunta.trim()) return alert("La pregunta no puede estar vacía.");
    setPreguntas(preguntas.map((p) => (p.id === editPregunta.id ? editPregunta : p)));
    setEditPregunta(null);
  };

  // Función para eliminar una pregunta
  const handleDeletePregunta = (id) => {
    setPreguntas(preguntas.filter((p) => p.id !== id));
  };

  return (
    <div className="preguntas-container">
      <h1>Gestión de Preguntas</h1>

      {/* Formulario para añadir una nueva pregunta */}
      <div className="add-pregunta-form">
        <input
          type="text"
          placeholder="Escribe una nueva pregunta"
          value={newPregunta}
          onChange={(e) => setNewPregunta(e.target.value)}
          className="pregunta-input"
        />
        <button className="add-pregunta-button" onClick={handleAddPregunta}>
          Añadir Pregunta
        </button>
      </div>

      {/* Contenedor con scroll para la lista de preguntas */}
      <div className="preguntas-list list-container">
        {preguntas.map((pregunta) => (
          <div key={pregunta.id} className="pregunta-card">
            {editPregunta && editPregunta.id === pregunta.id ? (
              <div className="edit-pregunta-form">
                <input
                  type="text"
                  value={editPregunta.pregunta}
                  onChange={(e) =>
                    setEditPregunta({ ...editPregunta, pregunta: e.target.value })
                  }
                  className="pregunta-input"
                />
                <button className="update-pregunta-button" onClick={handleUpdatePregunta}>
                  Guardar
                </button>
                <button className="cancel-button" onClick={() => setEditPregunta(null)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <p className="pregunta-text">{pregunta.pregunta}</p>
                <div className="pregunta-actions">
                  <button className="edit-button" onClick={() => handleEditPregunta(pregunta)}>
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePregunta(pregunta.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preguntas;
