import { updateToken } from "../utils";

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
        console.log("Datos iguales a los almacenados");
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

        console.log(`Datos actualizados: ${check}`);
    }

    if(res?.response?.status == 404){
        setRes(() => ({}));
        console.log("No se pudo actualizar los datos en la DB");
    }

    if(res?.response?.status == 500){
        setRes(() => ({}));
        console.log("Error interno del servidor");
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
