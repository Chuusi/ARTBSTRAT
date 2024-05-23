export const useDeleteUserError = (res,setRes,setDeleting, setUser) => {
    if(res?.status == 200){
        setUser(() => null);
        localStorage.removeItem("user");
        setRes(() => ({}))
        setDeleting(() => true)
        console.log("Usuario borrado correctamente");
    }

    /* if(res?.response?.data?.message.includes("Listas de productos no vaciadas")){
        setRes(() => ({}));
        console.log("Listas de productos no vaciadas");
    }

    if(res?.response?.data?.message.includes("Usuario no borrado de la DB")){
        setRes(() => ({}));
        console.log("Usuario no borrado de la DB");
    }

    if(res?.response?.data?.message.includes("Error en el try/catch general del deleteUser")){
        setRes(() => ({}));
        console.log("Error en el try/catch general del deleteUser");
    } */
}
