import { useState } from "react";
import "../css/Donaciones.css";
import DonationModal from "./DonationModal"; // Importa el componente del modal
import DNImage from "../assets/DN_00.png";
import DNImage1 from "../assets/DN_01.webp";
import DNImage2 from "../assets/DN_02.webp";
import DNImage3 from "../assets/DN_03.webp";
import DNImage4 from "../assets/DN_04.jpg";

const Donaciones = () => {
  // Estado para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      imgSrc: DNImage1,
      title: "Bolsa Ricocan 8kg para perros",
      description: "Alimento premium para perros con sabor a cordero y cereales.",
    },
    {
      imgSrc: DNImage2,
      title: "Bolsa Ricocat 8kg para gatos",
      description: "Alimento premium para gatos con todos los nutrientes esenciales.",
    },
    {
      imgSrc: DNImage3,
      title: "Cama para perros/gatos",
      description: "Cama cómoda y resistente para perros y gatos.",
    },
    {
      imgSrc: DNImage4,
      title: "Rascadera para gatos",
      description: "Rascadera perfecta para mantener a los gatos activos y felices.",
    },
  ];

  // Función para abrir el modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="donaciones">
      <div className="donaciones-header">
        <h2>Donaciones</h2>
        <img src={DNImage} alt="Main donation" className="donaciones-main-image" />
      </div>

      <h3 className="donaciones-subtitle">Donaciones:</h3>

      <div className="donaciones-products">
        {products.map((product, index) => (
          <div className="donaciones-product-card" key={index}>
            <img
              src={product.imgSrc}
              alt={product.title}
              className="donaciones-product-image"
            />
            <p className="product-name">{product.title}</p>
            <button
              className="donar-button"
              onClick={() => openModal(product)} // Abre el modal con el producto seleccionado
            >
              Donar
            </button>
          </div>
        ))}
      </div>

      {/* Modal para el producto seleccionado */}
      {isModalOpen && (
        <DonationModal
          product={selectedProduct}
          onClose={closeModal} // Pasa la función para cerrar el modal
        />
      )}
    </div>
  );
};

export default Donaciones;
