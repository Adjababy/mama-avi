import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import HowToOrder from "./components/HowToOrder";
import OrderForm from "./components/OrderForm";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

function App() {
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