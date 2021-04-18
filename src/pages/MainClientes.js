import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import apiCallGet from "../functions/apiCallGet";
import useLocalStorage from "../hooks/useLocalStorage";
import EmptyAlert from "../components/EmptyAlert"


const MainClientes = () => {
  const [storedId, setStoredId] = useLocalStorage("storedId", 0);
  const [term, setTerm] = useState("");
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    let url = `http://localhost:4000/api/cliente/lista`;
    apiCallGet(url, (dato) => setClientes([...dato.clientes]));
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
        mensaje={"Ver Facturas"}
        switchButton="/facturas"
        onSearch={search}
        display={true}

      />
      {clientes.length == 0 && <EmptyAlert text="No hay Clientes Registrados" icon="fa-user-circle"></EmptyAlert>}{" "}
      {clientes.length != 0 && (
      <Table primero={"Nombre"} segundo={"Apellido"} tercer={"Cantidad de facturas"}>
        <tfoot>
          {clientes
            .filter(
              (element) =>
                element.nombre
                  .toString()
                  .normalize("NFD")
                  .replace(
                    /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                    "$1"
                  )
                  .normalize()
                  .toLowerCase()
                  .includes(term) ||
                element.apellido
                  .toString()
                  .normalize("NFD")
                  .replace(
                    /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                    "$1"
                  )
                  .normalize()
                  .toLowerCase()
                  .includes(term) ||
                  element.factura.length.toString().includes(term)
            )
            .map((item, indice) => {
              return (
                <tr key={`tr2` + indice}>
                  <td key={item.nombre + indice ? item.nombre + indice : " "}>
                    {item.nombre ? item.nombre : ""}
                  </td>
                  <td
                    key={item.apellido + indice ? item.apellido + indice : ""}
                  >
                    {item.apellido ? item.apellido : ""}
                  </td>
                  <td
                    key={
                      item.factura.length + indice
                        ? item.factura.length + indice
                        : ""
                    }
                  >
                    {item.factura.length ? item.factura.length : "0"}
                  </td>
                  {
                    <td key={`boton` + indice}>
                      <a
                        href="/facturar"
                        className="btn btn-info hooverShadow"
                        onClick={() =>
                          storeId(
                            item.id
                          )
                        }
                      >
                        Facturar
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
export default MainClientes;
