import { alertaSuccess, alertaError } from "../utils";

export const useResendCodeError = (
    resResend,
    setResResend,
    setUserNotFound,
) => {

    //? Respuesta 200 se reenvió el código

    if(resResend?.data?.resend.toString() == "true") {
        setResResend(() => {});
        alertaSuccess("Se ha reenviado un nuevo código al correo", 2000)
    }


    //? Respuesta 404 resend en false, no se reenvío el código

    if(resResend?.data?.resend.toString() == "false"){
        setResResend(() => {})
        alertaError("Hubo un fallo en el reenvío, reinténtalo", 2000)
    }


    //? Respuesta 404 user not found

    if(
        resResend?.response?.status == 404 && 
        resResend?.response?.data?.message.includes("No existe un usuario en la DB con ese email")
    ) {
        setUserNotFound(() => true);
        setResResend(() => {});
        alertaError("Fallo al encontrar el usuario, inténtalo más tarde o regístrate primero", 3000);
    };


    //? 404 fallo en la actualización de la DB

    if(
        resResend?.response?.status == 404 && 
        resResend?.response?.data?.message.includes("No se actualizó el nuevo checkCode en la DB")
    ) {
        setResResend(() => {});
        alertaError("Ha habido un error, inténtalo más tarde", 2000);
    }

    //? Error 500 del servidor

    if(resResend?.response?.status == 500) {
        setResResend(() => {});
        alertaError("Ha habido un fallo en el servidor, inténtalo más tarde", 2000);
    }
}