export const useResendCodeError = (
    resResend,
    setResResend,
    setUserNotFound,
) => {

    //? Respuesta 200

    if(resResend?.data?.resend.toString() == "true") {
        setResResend(() => {});
        console.log("Reenvío de código satisfactorio");
    }


    //? Respuesta 404 resend en false

    if(resResend?.data?.resend.toString() == "false"){
        setResResend(() => {})
        console.log("No se reenvió el código correctamente");
    }


    //? Respuesta 404 user not founs

    if(
        resResend?.response?.status == 404 && 
        resResend?.response?.data?.message.includes("No existe un usuario en la DB con ese email")
    ) {
        setUserNotFound(() => true);
        setResResend(() => {});
        console.log("Usuario no encontrado");
    };


    //? Error 500 del servidor

    if(resResend?.response?.status == 500) {
        setResResend(() => {});
        console.log("Error del servidor");
    }
}