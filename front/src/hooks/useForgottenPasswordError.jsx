import { alertaSuccess, alertaError } from "../utils";

export const useForgottenPasswordError = (res, setRes, setForgotOk) => {

    //? Respuesta 200

    if(res?.status == 200) {
        setForgotOk(() => true)
        setRes(() => {});
        alertaSuccess("Se ha enviado un link al correo para el cambio de contraseña", 3000);
    }


    //? Error 404 usuario no encontrado

    if(
        res?.response?.status == 404 &&
        res?.response?.data?.message.includes("No existe un usuario con ese email")
    ) {
        setRes(() => {});
        alertaError("No se ha encontrado una cuenta asociada a ese correo", 3000)
    }


    //? Error 404 link no enviado

    if(
        res?.response?.status == 404 &&
        res?.response?.data?.message.includes("Error en el envío del link para el cambio de contraseña")
    ) {
        setRes(() => {});
        alertaError("Error en el envío de correo, inténtalo más tarde", 3000)
    }


    //? Error 500 de servidor

    if(res?.response?.status == 500) {
        setRes(() => {});
        alertaError("Error en el servidor, inténtalo más tarde", 2500);
    }

}