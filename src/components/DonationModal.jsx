import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Importar PropTypes para validar las props
import "../css/DonationModal.css"; // Importar estilos del modal

const DonationModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1); // Controla la cantidad seleccionada
  const modalRef = useRef(null); // Referencia al contenedor del modal

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  // Detectar clic fuera del modal y cerrar
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Cerrar el modal si el clic es fuera del contenido
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="donation-modal">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2>{product.name}</h2>
        </div>
        <div className="modal-body">
          <div className="product-image">
            <img src={product.imgSrc} alt={product.name} />
          </div>
          <div className="product-details">
            <h3>{product.name}</h3>
            <p>
              <strong>Descripción:</strong> {product.description}
            </p>
            <p>
              <strong>Cantidad:</strong>
            </p>
            <select value={quantity} onChange={handleQuantityChange}>
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-back" onClick={onClose}>
            Regresar
          </button>
          <button
            className="btn btn-donate"
            onClick={() => alert(`Donaste ${quantity} ${product.name}`)}
          >
            Donar
          </button>
        </div>
      </div>
    </div>
  );
};

// Validación de props con PropTypes
DonationModal.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired, // Cambié a imgSrc para que coincida con tu estructura
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DonationModal;
