export const useForgottenPasswordError = (res, setRes, setForgotOk) => {


    //? Respuesta 200

    if(res?.status == 200) {
        setForgotOk(() => true)
        setRes({});
        console.log("Link de cambio de contraseña enviado al mail");
    }


    //? Error 404 usuario no encontrado

    if(
        res?.response?.status == 404 &&
        res?.response?.data?.includes("No existe un usuario con ese email")
    ) {
        setRes({});
        console.log("No existe un usuario con ese email");
    }


    //? Error 404 link no enviado

    if(
        res?.response?.status == 404 &&
        res?.response?.data?.includes("Error en el envío del link para el cambio de contraseña")
    ) {
        setRes({});
        console.log("Error en el envío del link para el cambio de contraseña");
    }


    //? Error 500 de servidor

    if(res?.response?.status == 500) {
        setRes({});
        console.log("Error interno del servidor");
    }

}