import { alertaSuccess, alertaError } from "../utils";

export const useDeleteUserError = (res,setRes,setDeleting, setUser) => {
    if(res?.status == 200){
        setUser(() => null);
        localStorage.removeItem("user");
        setRes(() => ({}))
        setDeleting(() => true)
        alertaSuccess("Usuarrio borrado correctamente", 2000);
    }


    //? 404 no se quitó al usuario de las listas de productos

    if(res?.response?.data?.message.includes("Listas de productos no vaciadas")){
        setRes(() => ({}));
        alertaError("Hubo un error, inténtalo de nuevo", 2000);
    }

    if(res?.response?.data?.message.includes("Usuario no borrado de la DB")){
        setRes(() => ({}));
        alertaError("Usuario no borrado, inténtalo de nuevo", 2000);
    }

    if(res?.response?.status == 500){
        setRes(() => ({}));
        alertaError("Error en el servidor, inténtalo más tarde", 2500);
    }
}
