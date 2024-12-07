import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/admin/managepets.css";

const ManagePets = () => {
  const [pets, setPets] = useState([
    { id: 1, nombre: "Carlos", raza: "Bulldog Americano", edad: 12, imagen: null },
    { id: 2, nombre: "Luna", raza: "Labrador", edad: 5, imagen: null },
  ]);

  const [newPet, setNewPet] = useState({ nombre: "", raza: "", edad: "" });
  const [editPet, setEditPet] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPet = () => {
    const id = pets.length > 0 ? pets[pets.length - 1].id + 1 : 1;
    setPets([...pets, { id, ...newPet }]);
    setNewPet({ nombre: "", raza: "", edad: "" });
    setShowAddForm(false);
  };

  const handleEditPet = (pet) => {
    setEditPet(pet);
  };

  const handleUpdatePet = () => {
    setPets(pets.map((pet) => (pet.id === editPet.id ? editPet : pet)));
    setEditPet(null);
  };

  const handleDeletePet = (id) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  return (
    <div className="manage-pets-container">
      <h1>Mis Mascotas</h1>

      {/* Botón para mostrar/ocultar el formulario de añadir */}
      {!showAddForm && (
        <button
          className="add-pet-button"
          onClick={() => setShowAddForm(true)}
        >
          Añadir Mascota
        </button>
      )}

      {/* Formulario para añadir una nueva mascota con animación */}
      <div
        className={`add-pet-form ${showAddForm ? "visible" : "hidden"}`}
      >
        <h2>Añadir Mascota</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newPet.nombre}
          onChange={(e) => setNewPet({ ...newPet, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Raza"
          value={newPet.raza}
          onChange={(e) => setNewPet({ ...newPet, raza: e.target.value })}
        />
        <input
          type="number"
          placeholder="Edad"
          value={newPet.edad}
          onChange={(e) => setNewPet({ ...newPet, edad: e.target.value })}
        />
        <button className="add-pet-button" onClick={handleAddPet}>
          Guardar Mascota
        </button>
        <button
          className="cancel-button"
          onClick={() => setShowAddForm(false)}
        >
          Cancelar
        </button>
      </div>

      {/* Lista de mascotas */}
      <div className="pets-list">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <img
              src={pet.imagen || "/default-pet.png"}
              alt={pet.nombre}
              className="pet-image"
            />
            <h2>{pet.nombre}</h2>
            <p>Raza: {pet.raza}</p>
            <p>Edad: {pet.edad} años</p>
            <div className="pet-actions">
              <button className="edit-button" onClick={() => handleEditPet(pet)}>
                Editar
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeletePet(pet.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para editar una mascota */}
      {editPet && (
        <div className="edit-pet-form">
          <h2>Editar Mascota</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={editPet.nombre}
            onChange={(e) => setEditPet({ ...editPet, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Raza"
            value={editPet.raza}
            onChange={(e) => setEditPet({ ...editPet, raza: e.target.value })}
          />
          <input
            type="number"
            placeholder="Edad"
            value={editPet.edad}
            onChange={(e) => setEditPet({ ...editPet, edad: e.target.value })}
          />
          <button className="update-pet-button" onClick={handleUpdatePet}>
            Actualizar Mascota
          </button>
        </div>
      )}
    </div>
  );
};

ManagePets.propTypes = {
  user: PropTypes.shape({
    correo: PropTypes.string,
  }),
};

export default ManagePets;
