import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import HowToOrder from "./components/HowToOrder";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <HowToOrder />
      <About />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
