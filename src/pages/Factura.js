import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useLocalStorage from "../hooks/useLocalStorage";
import apiCallGet from "../functions/apiCallGet";


const Facturar = (props) => {
  const [storedId, setStoredId] = useLocalStorage("storedId", 0);
  const [factura, setFactura] = useState({});

  useEffect(() => {
    let url = `http://localhost:4000/api/factura/detalle/${storedId}`;
    apiCallGet(url, (dato) => setFactura(dato.factura));
  }, []);



  return (
    <>
      <Header
        mensaje={"Ver Facturas"}
        switchButton="/facturas"
        onSearch={0}
        display={false}
      />

      <div className="container-sm">
        <ul className="list-group">
          <li className="list-group-item">Fecha: {factura.fecha}</li>
          <li className="list-group-item">Nombre: {factura.cliente ? factura.cliente.nombre : ""}</li>
          <li className="list-group-item">Apellido: {factura.cliente ? factura.cliente.apellido : ""}</li>
          <li className="list-group-item">Domicilio: {factura.cliente ? factura.cliente.domicilio : ""}</li>
          <li className="list-group-item">Ciudad: {factura.cliente ? factura.cliente.ciudad.nombre : ""}</li>
          <li className="list-group-item">Email: {factura.cliente ? factura.cliente.email : ""}</li>
          <li className="list-group-item">Detalle: {factura.detalle}</li>
          <li className="list-group-item text-right">Importe: {factura.importe}</li>

        </ul>
        </div>


    </>
  );
};

export default Facturar;
