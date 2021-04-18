import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useLocalStorage from "../hooks/useLocalStorage";
import apiCallGet from "../functions/apiCallGet";
import apiCallPost from "../functions/apiCallPost";


const Facturar = (props) => {
  const [storedId, setStoredId] = useLocalStorage("storedId", 0);
  const [cliente, setCliente] = useState({});
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    let url = `http://localhost:4000/api/cliente/detalle/${storedId}`;
    apiCallGet(url, (dato) => setCliente(dato.cliente));
  }, []);

  const send = async (event) => {
      event.preventDefault()
      let url ='http://localhost:4000/api/factura/generate'
      apiCallPost(url,      {
        idCliente: storedId,
        detalle: event.target.detalle.value,
        importe: event.target.importe.value,
      }, (dato) => setGenerated(dato));
    }



  return (
    <>
      <Header
        mensaje={"Ver Clientes"}
        switchButton="/"
        onSearch={0}
        display={false}
      />

      <div className="container-sm">
        <ul className="list-group">
          <li className="list-group-item">Nombre: {cliente.nombre}</li>
          <li className="list-group-item">Apellido: {cliente.apellido}</li>
          <li className="list-group-item">Domicilio: {cliente.domicilio}</li>
          <li className="list-group-item">Ciudad: {cliente.ciudad ? cliente.ciudad.nombre : ""}</li>
          <li className="list-group-item">Email: {cliente.email}</li>
        </ul>
        <div className="d-flex justify-content-end">
        <form className="form-inline" onSubmit={send}>
        <div className="form-group">
             <label htmlFor="exampleFormControlTextarea1">Detalle</label>
             <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" cols="50" name="detalle" required></textarea>
            </div>
            <div>
                <input 
                type="number"
                step="0.0001"
                name="importe"
                placeholder="Ingrese monto"
                required
                className="form-control"/>
            </div>

            <div>
                <button type="submit" className="btn btn-dark hooverShadow">Generar</button>
            </div>
        </form>
        </div>
        {(generated) && (
          <div className="alert alert-success text-center d-flex justify-content-center" role="alert">
            Factura generada exitosamente
          </div>
        )}{" "}
      </div>
    </>
  );
};

export default Facturar;
