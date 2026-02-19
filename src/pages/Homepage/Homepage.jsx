import React from 'react'
import ScrollVideo from '../../components/ScrollVideo/ScrollVideo'
import axios from "axios";
import { useState } from "react";
import AboutUs from '../../components/AboutUs/AboutUs';
import BrandsAndWork from '../../components/BrandsAndWork/BrandAndWork';



function Homepage() {
    const [fixedAcidity, setFixedAcidity] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        fixed_acidity: parseFloat(fixedAcidity),
        alcohol: parseFloat(alcohol)
      }
    );

    setResult(response.data.calculated_score);
  };
  return (
    <>
    <ScrollVideo/>
    <AboutUs/>
    <BrandsAndWork/>
     </>
  )
}

export default Homepage