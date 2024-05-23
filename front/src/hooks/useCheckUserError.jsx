export const useCheckUserError = (
    res,
    setRes,
    setOkCheck,
    setOkDeleteUser,
    login,
    setUserNotFound
) => {

    //? Respuesta 200

    console.log("res del useCheckUSerError", res);

    if(res?.data?.testCheckOk?.toString() == "true"){

        if(localStorage.getItem("user")) {

            const currentUser = localStorage.getItem("user");
            const parseUser = JSON.parse(currentUser);
            const customUser = {
                ...parseUser,
                check: true,
            };

            const userJSON = JSON.stringify(customUser);
            console.log("useCheck",userJSON);
            login(userJSON);
        }

        setOkCheck(() => true);
        setRes(() => {});
        console.log("Check con éxito");
    };


    //? Respuesta 200 pero sin cambio en el back
    
    if(res?.data?.testCheckOk?.toString() == "false"){
        setRes(() => {});
        console.log("No se actualizó el check en la base de datos");
    }


    //? Aviso de 2 trys, a los 3 se borrará el usuario

    if(res?.data?.trys == 2){
        console.log("2 intentos fallidos, al 3º se borrará el usuario");
    };

    if(res?.data?.message?.includes("Intento número 3 fallido, eliminando usuario de la DB")){
        console.log("Usuario borrado de la DB al fallar 3 veces");
        setOkDeleteUser(() => true)
    };

    
    //? Código fallado

    if(res?.data?.message.includes("al fallar 3, se borrará el usuario")){
        console.log("Código incorrecto");
    }

    //? Respuesta 404: user not found 

    if(res?.response?.status == 404) {
        setUserNotFound(() => true);
        setRes(() => {});
        console.log("No se encontró un usuario con ese mail");
    }
}