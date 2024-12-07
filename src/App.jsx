import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Welcome from "./components/shared/Welcome";
import QuienesSomos from "./components/shared/QuienesSomos";
import Donaciones from "./components/donations/Donaciones";
import Albergues from "./components/shelters/Albergues";
import Encuentros from "./components/adoption/Encuentros";
import Mascotas from "./components/users/Mascotas";
import Perfil from "./components/shelters/Perfil";
import EncuentroConfirmacion from "./components/adoption/EncuentroConfirmacion";
import TerminosLegales from "./components/shared/TerminosLegales";
import FormAdopcion from "./components/adoption/FormAdopcion";
import InfoLegal from "./components/shared/InfoLegal";
import AdminSite from "./components/admin/adminsite";
import Home from "./components/shared/Home"; // Asegúrate de importar correctamente el componente Home

function App() {
  const location = useLocation();

  const currentUser = {
    tipo_usuario: "albergue",
    nombre: "Albergue Ejemplo",
    correo: "albergue@example.com",
  };

  const hideNavbarFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/donaciones" element={<Donaciones />} />
          <Route path="/albergues" element={<Albergues />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/encuentros/:id" element={<Encuentros />} />
          <Route path="/confirmacion/:id" element={<EncuentroConfirmacion />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/form-adopcion" element={<FormAdopcion />} />
          <Route path="/info-legal" element={<InfoLegal />} />
          <Route path="/terminos-legales" element={<TerminosLegales />} />
          <Route path="/adminsite" element={<AdminSite user={currentUser} />} />
        </Routes>
      </div>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
