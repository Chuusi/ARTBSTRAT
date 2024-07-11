import { alertaError, alertaSuccess, updateToken } from "../utils";

export const useUpdateUserError = (res, setRes, login, setUpdateOk) => {
    let contador;
    let totalItems;
    let check = "";

    //Controlamos el número total de items a checkear y verificamos los que han cambiado
    //Contador llevará un control de los items que NO han cambiado
    if(res?.data) {
        contador = 0;
        totalItems = 0;

        res?.data?.testUpdate?.map((item) => {
            for(let clave in item) {
                totalItems++;
                if(item[clave] == false){
                    contador++;
                }
            }
        })
    }

    if(contador != totalItems){
        res?.data?.testUpdate?.forEach((item) => {
            for (let clave in item) {
                if(item[clave] == true){
                    switch (clave){
                        case "name":
                            check += " - Nombre - ";
                            break;
                        case "address":
                            check += " - Dirección - ";
                            break;
                        case "dateOfBirth":
                            check += " - Fecha de nacimiento - ";
                            break;
                        case "image":
                            check += " - Imagen de perfil - ";
                            break;
                        default:
                            break;
                    }
                }
            }
        })
    }

    //Si el total de items es igual a contador, nada ha cambiado
    if(res?.status == 200 && contador == totalItems){
        setRes(() => ({}));
        alertaError("Los datos son iguales a los anteriores", 2000)
    }

    if(res?.status == 200) {
        setRes(() => ({}));
        
        const currentToken = updateToken();
        const customData = {
            email: res?.data?.testUpdateUser?.email,
            check: res?.data?.testUpdateUser?.check,
            image: res?.data?.testUpdateUser?.image,
            user: res?.data?.testUpdateUser?.name,
            _id: res?.data?.testUpdateUser?._id,
            token: currentToken,
        }
        const stringUser = JSON.stringify(customData);
        login(stringUser);
        setUpdateOk(() => true);
        alertaSuccess(`Datos actualizados: ${check}`,3000)
    }


    //? 404 formato de nombre incorrecto

    if(res?.response?.data.message.includes("El nuevo nombre sólo puede contener letras y números y hasta 20 caracteres máximos")){
        setRes(() => {});
        alertaError("El nuevo nombre sólo puede contener letras y números y hasta 20 caracteres máximos", 4000);
    }


    if(res?.response?.data?.message.includes("No se actualizó la información en la DB")){
        setRes(() => ({}));
        alertaError("No se pudo actualizar la información, inténtalo de nuevo", 3000);
    }

    if(res?.response?.status == 500){
        setRes(() => ({}));
        alertaError("Error en el servidor, inténtalo más tarde", 3000);
    }


    //Algo ha cambiado en los items, pero no se actualizó bien la información y dió respuesta 200
    //A verificar el condicional
    /* if(contador != 0){
        if(res?.status == 200){
            setRes(() => ({}));
            console.log("Algo ha fallado, inténtelo de nuevo");
        }
    } */

}
