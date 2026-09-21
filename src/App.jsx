import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import HowToOrder from "./components/HowToOrder";
import OrderForm from "./components/OrderForm";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MamaAvi from "./MamaAvi";
import Admin from "./Admin";
function App() {
  console.log("URL actuelle:", window.location.pathname);
  if (window.location.pathname.includes("/admin")) {
    return <Admin />;
  }
  <BrowserRouter basename="/mama-avi">
      <Routes>
        <Route path="/" element={<MamaAvi />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <HowToOrder />
        <OrderForm />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
export default App;