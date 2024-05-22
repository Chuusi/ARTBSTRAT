
export const useChangePasswordError = (res, setRes, setUser, setChanged) => {
    if(res?.data?.updateUser?.toString() == "true"){
        setUser(() => null);
        localStorage.removeItem("user");
        setChanged(() => true);
        setRes(() => ({}));
    };

    if(res?.response?.data?.message.includes("La contraseña no se actualizó")){
        setRes(() => ({}));
        console.log("La contraseña no se actualizó");
    }

    if(res?.response?.data?.message.includes("Error en la búsqueda de user en la DB")){
        setRes(() => ({}));
        console.log("Error en la búsqueda de user en la DB");
    }

    if(res?.response?.data?.message.includes("La antigua contraseña no es correcta")){
        setRes(() => ({}));
        console.log("La antigua contraseña no es correcta");
    }

    if(res?.response?.data?.message.includes("La nueva contraseña no es segura")){
        setRes(() => ({}));
        console.log("La nueva contraseña no es segura");
    }

    if(res?.response?.data?.message.includes("Error en el try/catch general del changePassword")){
        setRes(() => ({}));
        console.log("Error en el try/catch general del changePassword");
    }
}
