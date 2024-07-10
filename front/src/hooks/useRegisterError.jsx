import { alertaSuccess, alertaError } from "../utils";

export const useRegisterError = (res, setRegisterOk, setRes) => {

    //? Respuesta 200

    if(res?.status == 200){
        const dataJSON = JSON.stringify(res);
        localStorage.setItem("data", dataJSON);
        setRegisterOk(() => true);
        setRes(() => {});
        alertaSuccess("Registro exitoso", 1500);
    };


    //? Respuesta 409 User ya existe

    if(res?.response?.status == 409){
        alertaError("Ya existe un usuario con ese email", 3000)
        setRes(() => {});
    }

    
    //? 404 Error al guardar el usuario en la DB

    if(res?.response?.data?.error?.message?.includes("Error al guardar el usuario en la DB")){
        alertaError("No se pudo crear la cuenta, reinténtelo más tarde", 3000);
        setRes(() => {});
    }


    //? Respuesta contraseña en mal formato (Viene del validator del modelo)

    if(res?.response?.data?.error?.message?.includes("La contraseña no es lo suficientemente segura")){
        alertaError("La contraseña debe contener mínimo 1 mayúscula, 1 minúscula y un carácter especial", 5000);
        setRes(() => {});
    }


    //? Respuesta nombre en mal formato (Viene del validator del modelo)

    if(res?.response?.data?.error?.message?.includes("El nombre sólo debe contener letras y números")){
        alertaError("El nombre sólo puede contener letras y números", 3000);
        setRes(() => {});
    }


    //? 404 Error en el envío de código

    if(res?.response?.data?.error?.message?.includes("Error en el envío del código de confirmación")){
        alertaError("Ha habido un error con el envío de código, reenvío de código necesario", 5000);
        setRes(() => {});
    }


    //? 500 Error del servidor

    if(res?.response?.status == 500){
        alertaError("Error en el servidor", 1500);
        setRes(() => {})
    }
}
