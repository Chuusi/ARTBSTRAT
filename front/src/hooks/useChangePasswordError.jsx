import { alertaSuccess, alertaError } from "../utils";

export const useChangePasswordError = (res, setRes, setUser, setChanged) => {
    if(res?.data?.updateUser?.toString() == "true"){
        setUser(() => null);
        localStorage.removeItem("user");
        setChanged(() => true);
        setRes(() => ({}));
        alertaSuccess("Contraseña cambiada, vuelve a inicar sesión", 2500)
    };


    //? 404 no se actualizó el back

    if(res?.response?.data?.message.includes("La contraseña no se actualizó")){
        setRes(() => ({}));
        alertaError("Error al cambiar la contraseña", 2000)
    }


    //? 404 no se encontró el user en DB

    if(res?.response?.data?.message.includes("Error en la búsqueda de user en la DB")){
        setRes(() => ({}));
        alertaError("Error de usuario, vuelve a iniciar sesión", 2500);
    }


    //? 404 contraseña incorrecta

    if(res?.response?.data?.message.includes("La antigua contraseña no es correcta")){
        setRes(() => ({}));
        alertaError("La antigua contraseña no es correcta", 2000);
    }


    //? 404 nueva contraseña insuficiente

    if(res?.response?.data?.message.includes("La nueva contraseña no es segura")){
        setRes(() => ({}));
        alertaError("La nueva contraseña debe contener mínimo 1 mayúscula, 1 minúscula y un carácter especial", 5000);
    }

    if(res?.response?.status == 500){
        setRes(() => ({}));
        alertaError("Error en el servidor, inténtalo más tarde", 2000)
    }
}
