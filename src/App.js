import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Inicio } from './components/Inicio/Inicio';
import { Confirmacion } from './components/Confirmacion/Confirmacion';
import { Validaciones } from './components/Validaciones/Validaciones';
import { ErrorValidacion } from './components/ErrorValidacion/ErrorValidacion';
import { ErrorConfirmacion } from './components/ErrorConfirmacion/ErrorConfirmacion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Exito } from './components/Exito/Exito';

function App() {
  const [llamadaTraida, setLlamadaTraida] = useState(null);
  useEffect(() => {
    const traerLlamada = async () => {
      const llamada = await axios.get("http://localhost:4000/api/datos-llamada")
      setLlamadaTraida(llamada.data)
    }
    traerLlamada()
  }, [])

  useEffect(() => {
    console.log("llamada traida: ", llamadaTraida)
  }, [llamadaTraida])


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Inicio
              llamadaTraida={llamadaTraida}
            />
          }
        />

        <Route
          path="/confirmacion"
          element={
            <Confirmacion />
          }
        />

        <Route
          path="/validaciones"
          element={
            <Validaciones
              llamadaTraida={llamadaTraida}
            />
          }
        />

        <Route
          path='/errorValidacion'
          element={
            <ErrorValidacion />
          }
        />

        <Route
          path='/errorConfirmacion'
          element={
            <ErrorConfirmacion />
          }
        />

        <Route
          path='/exito'
          element={
            <Exito />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
