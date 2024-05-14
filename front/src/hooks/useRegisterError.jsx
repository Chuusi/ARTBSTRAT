export const useRegisterError = (res, setRegisterOk, setRes) => {

    //? Respuesta 200

    if(res?.status == 200){
        console.log("Registro satisfactorio.");
        const dataJSON = JSON.stringify(res);
        localStorage.setItem("data", dataJSON);
        setRegisterOk(() => true);
        setRes(() => {});
    };


    //? Respuesta 409 User ya existe

    if(res?.response?.status == 409){
        console.log("Ya existe un usuario con ese email");
        setRes(() => {});
    }


    //? Respuesta contraseña en mal formato (Viene del validator del modelo)

    if(res?.response?.data?.message?.includes("La contraseña no es lo suficientemente segura")){
        console.log("La contraseña debe contener mínimo 1 mayúscula, 1 minúscula y un carácter especial");
        setRes(() => {});
    }


    //? Respuesta nombre en mal formato (Viene del validator del modelo)

    if(res?.response?.data?.message?.includes("El nombre sólo debe contener letras y números")){
        console.log("El nombre sólo puede contener letras y números");
        setRes(() => {});
    }


    //? 404 Error en el envío de código

    if(res?.response?.data.message.includes("Error en el envío del código de confirmación")){
        console.log("Reenvío de código necesario");
        setRes(() => {});
    }


    //? 500 Error del servidor

    if(res?.response?.status == 500){
        console.log("Error en el servidor");
        setRes(() => {})
    }
}
