import { alertaSuccess, alertaError } from "../utils";

export const useChangeForgottenPasswordError = (res, setRes, setChanged ) => {
    if(res?.status == 200){
        setChanged(true);
        setRes({});
        alertaSuccess("Contraseña cambiada con éxito", 2000);
    } 


    //? 404 error al cambiar contraseña en DB

    if(res?.response?.data?.message.includes("La contraseña no se cambió con éxito")) {
        setRes(() => {});
        alertaError("No se pudo cambiar la contraseña", 2000);
    }

    if(res?.response?.data?.message.includes("Error en el cambio de contraseñas en la DB")) {
        setRes(() => {});
        alertaError("No se pudo cambiar la contraseña", 2000);
    }


    //? 404 contraseñas no coinciden

    if(res?.response?.data?.message.includes("Las nuevas contraseñas no coinciden")) {
        setRes(() => {});
        alertaError("Las contraseñas no coinciden", 2000);
    }


    //? 404 contraseña insuficiente

    if(res?.response?.data?.message.includes("La nueva contraseña no es segura")) {
        setRes(() => {});
        alertaError("La contraseña debe contener mínimo 1 mayúscula, 1 minúscula y un carácter especial", 5000);
    }

    if(res?.response?.status == 500) {
        setRes(() => {});
        alertaError("Error en el servidor, inténtalo más tarde", 2000);
    }
}