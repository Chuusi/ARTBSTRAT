import { alertaSuccess, alertaError } from "../utils";

export const useAdminUserError = (resAdmin, setResAdmin) => {
    console.log(resAdmin);
    if(resAdmin?.status == 200 && resAdmin?.data?.message.includes("Se ha cambiado la información del usuario")){
        setResAdmin(() => ({}));
        alertaSuccess("Se ha modificado el usuario", 2000);
    }
    

    //? 200 no se cambió nada

    if(resAdmin?.data?.message.includes("No se ha cambiado la información del usuario")){
        setResAdmin(() => {});
        alertaSuccess("Datos iguales a los ya almacenados", 2000);
    }


    //? 404 error en el testeo

    if(resAdmin?.response?.data?.message.includes("No se llevo a cabo el testeo")){
        setResAdmin(() => {});
        alertaError("Ha habido un error, inténtalo más tarde", 3000);
    }

    if(resAdmin?.response?.status == 500){
        setResAdmin(() => {})
        alertaError("Error en el servidor, inténtalo más tarde", 2500);
    }
}
