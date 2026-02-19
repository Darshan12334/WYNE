import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Slider from "./components/Slider/Slider";
import Homepage from "./pages/Homepage/Homepage";
import Predict from "./pages/Predict/Predict";


function App() {
  const [v, setV] = useState(0.5);

  return (
    <BrowserRouter>
=      <Navbar />

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Homepage />
              
            </>
          }
        />

        {/* Predict Route */}
        <Route path="/predict" element={<Predict />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;







