import { alertaSuccess, alertaError } from "../utils";

export const useCheckUserError = (
    res,
    setRes,
    setOkCheck,
    setOkDeleteUser,
    login,
    setUserNotFound
) => {

    //? Respuesta 200

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
        alertaSuccess("Código correcto", 1500);
    };


    //? Respuesta 200 pero sin cambio en el back
    
    if(res?.data?.testCheckOk?.toString() == "false"){
        setRes(() => {});
        console.log("No se actualizó el check en la base de datos");
        alertaError("Código correcto, pero hubo un error, reinténtalo", 3000)
    }

    
    //? No se actualizó el número de trys

    if(res?.response?.data.message.includes("No se pudo actualizar la información en la DB")){
        setRes(() => {});
        alertaError("Hubo en fallo en la verificación de código", 3000)
    }


    //? Aviso de 2 trys, a los 3 se borrará el usuario

    if(res?.data?.trys == 2){
        alertaError("2 intentos fallidos, al 3º se borrará el usuario", 3000)
    };

    if(res?.data?.message?.includes("Intento número 3 fallido, eliminando usuario de la DB")){
        alertaError("Se borró la cuenta al fallar 3 veces el código", 3000)

        setOkDeleteUser(() => true)
    };

    
    //? Código fallado

    if(res?.data?.message.includes("al fallar 3, se borrará el usuario")){
        alertaError("Código incorrecto, si se falla 3 veces, se borrará la cuenta", 3000)

    }


    //? 404 No se borró el usuario tras 3 fallose

    if(res?.response?.data.message.includes("No se pudo borrar al usuario de la DB tras fallar 3 veces el check code")){
        setRes(() => {});
        alertaError("Se falló 3 veces, pero ha habido un error al borrar la cuenta", 3000)
    }


    //? Respuesta 404: user not found 

    if(res?.response?.status == 404) {
        setUserNotFound(() => true);
        setRes(() => {});
        alertaError("No se encontró un usuario con ese mail", 3000);
    }
}