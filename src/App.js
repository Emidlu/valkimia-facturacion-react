import React from "react";
import MainClientes from "./pages/MainClientes";
import Facturas from "./pages/Facturas";
import Facturar from "./pages/Facturar";
import Factura from "./pages/Factura";
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <MainClientes />
        </Route>
        <Route exact path="/facturar">
          <Facturar />
        </Route>
        <Route exact path="/facturas">
          <Facturas />
        </Route>
        <Route exact path="/factura">
          <Factura />
        </Route>
      </Router>
    </div>
  );
}

export default App;
