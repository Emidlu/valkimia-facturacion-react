import axios from "axios";

async function apiCall(url, datosEnviar, consecuencia) {
  try {
    const respuesta = await axios.post(url,datosEnviar);
    if(respuesta.status == 200)
    consecuencia(true);
  } catch (error) {
    console.log(error);
  }
}

export default apiCall;
