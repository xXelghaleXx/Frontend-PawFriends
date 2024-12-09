import { useState } from "react";
import "../../styles/admin/managepets.css";

const ManagePets = () => {
  const [pets, setPets] = useState([
    { id: 1, nombre: "Carlos", raza: "Bulldog Americano", edad: 12, imagen: null },
    { id: 2, nombre: "Luna", raza: "Labrador", edad: 5, imagen: null },
  ]);

  const [formData, setFormData] = useState({ nombre: "", raza: "", edad: "", imagen: null });
  const [showForm, setShowForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  // Añadir una nueva mascota
  const handleAddPet = () => {
    if (!formData.nombre || !formData.raza || !formData.edad) return;
    const id = pets.length + 1;
    setPets([...pets, { id, ...formData }]);
    resetForm();
    setShowForm(false);
  };

  // Editar una mascota seleccionada
  const handleEditPet = (pet) => {
    setSelectedPet(pet);
    setFormData(pet);
    setShowForm(true);
  };

  // Guardar los cambios en la mascota editada
  const handleSaveEdit = () => {
    setPets(pets.map((pet) => (pet.id === selectedPet.id ? formData : pet)));
    resetForm();
  };

  // Eliminar una mascota
  const handleDeletePet = (id) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  // Actualizar los datos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({ nombre: "", raza: "", edad: "", imagen: null });
    setSelectedPet(null);
    setShowForm(false);
  };

  return (
    <div className="manage-pets-container">
      <h1>Mis Mascotas</h1>

      <button 
        className="add-pet-button" 
        onClick={() => { 
          resetForm();
          setShowForm(true); 
        }}>
        Añadir Mascota
      </button>

      <div className="pets-list">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <img src={pet.imagen || "/default-pet.png"} alt={pet.nombre} className="pet-image" />
            <h2>{pet.nombre}</h2>
            <p>Raza: {pet.raza}</p>
            <p>Edad: {pet.edad} años</p>
            <div className="pet-actions">
              <button className="edit-button" onClick={() => handleEditPet(pet)}>
                Editar
              </button>
              <button className="delete-button" onClick={() => handleDeletePet(pet.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedPet ? "Editar Mascota" : "Añadir Mascota"}</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="raza"
              placeholder="Raza"
              value={formData.raza}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleInputChange}
            />
            <div className="form-actions">
              <button 
                className="save-pet-button" 
                onClick={selectedPet ? handleSaveEdit : handleAddPet}>
                {selectedPet ? "Guardar Cambios" : "Añadir"}
              </button>
              <button className="cancel-button" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePets;
