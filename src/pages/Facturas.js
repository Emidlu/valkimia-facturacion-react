import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import apiCallGet from "../functions/apiCallGet";
import useLocalStorage from "../hooks/useLocalStorage";
import EmptyAlert from "../components/EmptyAlert";

const Facturas = (props) => {
  const [term, setTerm] = useState("");
  const [facturas, setFacturas] = useState([]);
  const [storedId, setStoredId] = useLocalStorage("storedId", 0);



  useEffect(() => {
    let url = `http://localhost:4000/api/factura/lista`;
    apiCallGet(url, (dato) => setFacturas([...dato.facturas]));
  }, []);


  const storeId = async (id) => {
    setStoredId(id)
  };

  const search = (e) => {
    setTerm(e.target.value.toLowerCase());
  };


  return (
    <>
      <Header
        mensaje={"Ver clientes"}
        switchButton="/"
        onSearch={search}
        display={true}

      />
      {facturas.length == 0 && <EmptyAlert text="No hay facturas" icon="fa-file-alt"></EmptyAlert>}{" "}
      {facturas.length != 0 && (
        <Table primero={"Fecha"} segundo={"Nombre"} cuarto={"Monto"} tercer={"Apellido"}>
          <tfoot>
            {facturas
              .filter(
                (element) =>
                  (element.cliente ? element.cliente.nombre : "")
                    .normalize("NFD")
                    .replace(
                      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                      "$1"
                    )
                    .normalize()
                    .toLowerCase()
                    .includes(term) ||
                  element.detalle.includes(term) ||
                  element.importe.includes(term) ||
                  element.fecha.includes(term) ||
                  (element.cliente ? element.cliente.apellido : "")
                  .normalize("NFD")
                  .replace(
                    /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                    "$1"
                  )
                  .normalize()
                  .toLowerCase()
                  .includes(term)
              )
              .map((item, indice) => {

                return (
                  <tr key={`tr2` + indice}>
                    <td key={item.fecha + indice ? item.fecha + indice : " "}>
                      {item.fecha ? item.fecha : ""}
                    </td>
                    <td
                      key={item.cliente ? item.cliente.nombre + indice : ""}
                    >
                      {item.cliente ? item.cliente.nombre : ""}
                    </td>
                    <td
                      key={item.cliente + indice ? item.cliente.apellido + indice : ""}
                    >
                      {item.cliente ? item.cliente.apellido : ""}
                    </td>
                    <td key={item.importe ? item.importe + indice : ""}>
                      {item.importe ? item.importe : ""}
                    </td>
                    {
                      <td key={`boton` + indice}>
                      <a
                        href="/factura"
                        className="btn btn-info hooverShadow"
                        onClick={() =>
                          storeId(
                            item.id
                          )
                        }
                      >
                        Ver factura
                      </a>
                      </td>
                    }
                  </tr>
                );
              })}
          </tfoot>
        </Table>
      )}
    </>
  );
};
export default Facturas;
