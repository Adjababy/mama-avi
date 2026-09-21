import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import HowToOrder from "./components/HowToOrder";
import Contact from "./components/Contact";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Admin from "./Admin";

function Boutique() {
  return (
    <>
      <Navbar /><Hero /><Products /><About /><HowToOrder /><Contact /><OrderForm /><Footer /><WhatsAppFloat />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Boutique />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}