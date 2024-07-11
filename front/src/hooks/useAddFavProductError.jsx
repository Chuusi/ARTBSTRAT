import { alertaSuccess, alertaError } from "../utils";

export const useAddFavProductError = (res, setRes) => {

    //? 200 : TODO OKEY
    if(res?.status == 200){
        setRes(()=>({}))
        alertaSuccess("Lista de favoritos modificada", 2000);
    }


    //? 404 no se modificó alguna de las listas, tanto de producto como de user tanto al añadir como al quitar

    if(res?.response?.data?.message.includes("No se pudo quitar el user de la lista de favoritos")
    || res?.response?.data?.message.includes("No se pudo quitar el producto de la lista de favoritos")
    || res?.response?.data?.message.includes("No se pudo añadir el user a la lista de favoritos")
    || res?.response?.data?.message.includes("No se pudo añadir el producto a la lista de favoritos")
    ){
        setRes(() => {});
        alertaError("Error al modificar la lista de favoritos", 2500);
    }


    //? 404 testing lista

    if(res?.response?.data?.message.includes("La lista de favoritos no se actualizó correctamente")){
        setRes(() => {});
        alertaError("Error al modificar la lista de favoritos", 2500);
    }


    //? 404 testing user

    if(res?.response?.data?.message.includes("No se encontró el user por id en el testeo")){
        setRes(() => {});
        alertaError("No se encontró el usuario, vuelve a iniciar sesión", 2500);
    }


    //? ----> STATUS 500 : ERROR DEL SERVIDOR 
    if(res?.status == 500){
        setRes(()=>({}))
        alertaError("Error en el servidor, inténtalo más tarde", 2500);
    }
}