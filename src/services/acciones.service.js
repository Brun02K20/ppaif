import axios from "axios";

const traerAcciones = async () => {
    const acciones = await axios.get("http://localhost:4000/api/acciones")
    const accionesTraidas = acciones.data
    return accionesTraidas
}

const accionesService = { traerAcciones }
export { accionesService }