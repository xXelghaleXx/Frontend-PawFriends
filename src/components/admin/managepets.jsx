import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/managepets.css";

// Configuración global de Axios
axios.defaults.baseURL = "http://localhost:8000/mascotas/";
axios.defaults.headers.common["Content-Type"] = "application/json";

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    raza: "",
    edad: "",
    tamaño: "",
    sexo: "",
    vacunas_completas: "",
    esterilizado: "",
    descripcion: "",
    albergue: "",
  });
  const [showForm, setShowForm] = useState(false);

  // 🚀 Cargar la lista de mascotas desde la API de Django
  const fetchPets = async () => {
    try {
      const response = await axios.get("/");
      setPets(response.data);
    } catch (error) {
      console.error("Error al cargar las mascotas:", error);
      alert("No se pudo cargar la lista de mascotas. Intenta más tarde.");
    }
  };

  // Se ejecuta al cargar el componente
  useEffect(() => {
    fetchPets();
  }, []);

  // 🔥 Añadir una nueva mascota
  const handleAddPet = async () => {
    // Validar que todos los campos estén llenos
    const isEmpty = Object.values(formData).some(
      (value) => value === "" || value === null
    );

    if (isEmpty) {
      alert("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await axios.post("/crear/", formData);
      console.log("Mascota creada:", response.data);
      alert("Mascota añadida exitosamente");
      setPets([...pets, response.data]); // Agrega la nueva mascota a la lista
      resetForm();
    } catch (error) {
      console.error("Error al crear la mascota:", error.response || error.message);
      alert(
        error.response?.data?.error ||
          "No se pudo añadir la mascota. Verifica los datos e intenta de nuevo."
      );
    }
  };

  // ✍️ Actualizar los datos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔄 Resetear el formulario
  const resetForm = () => {
    setFormData({
      nombre: "",
      raza: "",
      edad: "",
      tamaño: "",
      sexo: "",
      vacunas_completas: "",
      esterilizado: "",
      descripcion: "",
      albergue: "",
    });
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
        }}
      >
        Añadir Mascota
      </button>

      <div className="pets-list">
        {pets.map((pet) => (
          <div key={pet.id_perro} className="pet-card">
            <h2>{pet.nombre}</h2>
            <p>Raza: {pet.raza}</p>
            <p>Edad: {pet.edad} años</p>
            <p>Tamaño: {pet.tamaño}</p>
            <p>Sexo: {pet.sexo}</p>
            <p>Vacunas completas: {pet.vacunas_completas ? "Sí" : "No"}</p>
            <p>Esterilizado: {pet.esterilizado ? "Sí" : "No"}</p>
            <p>Descripción: {pet.descripcion}</p>
            <p>Albergue: {pet.albergue}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Añadir Mascota</h2>
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
            <input
              type="text"
              name="tamaño"
              placeholder="Tamaño"
              value={formData.tamaño}
              onChange={handleInputChange}
            />
            <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
              <option value="">Sexo</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            <select
              name="vacunas_completas"
              value={formData.vacunas_completas}
              onChange={handleInputChange}
            >
              <option value="">Vacunas completas</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
            <select
              name="esterilizado"
              value={formData.esterilizado}
              onChange={handleInputChange}
            >
              <option value="">Esterilizado</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="albergue"
              placeholder="Albergue"
              value={formData.albergue}
              onChange={handleInputChange}
            />
            <div className="form-actions">
              <button className="save-pet-button" onClick={handleAddPet}>
                Añadir
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
