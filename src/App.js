import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage/Homepage";
import Predict from "./pages/Predict/Predict";


function App() {

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







