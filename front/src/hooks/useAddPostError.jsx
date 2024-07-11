import { alertaSuccess, alertaError } from "../utils";

export const useAddPostError = (res, setRes, setAdded) => {
    if(res.status == 200) {
        setRes(() => {})
        setAdded(() => true);
        alertaSuccess("Post añadido con éxito", 2000)
    }

    if(res?.response?.data.message.includes("No se ha posido crear el nuevo post")
    || res?.response?.data.message.includes("No se ha podido crear un nuevo Post en la DB")
    ){
        setRes(() => {});
        alertaError("Error en la creación del post",2500);
    }

    if(res?.response?.data?.message.includes("Solo un administrador puede crear nuevos posts en esta página")){
        setRes(() => {});
        alertaError("No dispones de los permisos suficientes para hacer eso",3000)
    }

    if(res?.response?.status == 500){
        setRes(() => {})
        alertaError("Error del servidor, inténtalo más tarde", 3000)
    }
}
