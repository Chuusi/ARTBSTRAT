import { alertaSuccess, alertaError } from "../utils";

export const useAddProductError = (res, setRes, setAdded) => {
    if(res?.status == 200){
        setRes(() => {});
        setAdded(() => true);
        alertaSuccess("Producto añadido", 2000);
    }

    if(res?.response?.data?.message?.includes("No se ha podido guardar el nuevo producto en la DB")
    || res?.response?.data?.message?.includes("No se ha podido llevar a cabo la creación de un nuevo producto en la DB")
    ){
        setRes(() => {});
        alertaError("No se pudo crear o guardar el nuevo producto", 2500)
    }

    if(res?.response?.data?.message?.includes("Solo un administrador puede crear nuevos productos en esta página")){
        setRes(() => {});
        alertaError("No dispones de los permisos suficientes para hacer eso",3000)
    }

    if(res?.response?.status == 500){
        setRes(() => {})
        alertaError("Error del servidor, inténtalo más tarde", 3000)
    }
}
