import { alertaSuccess, alertaError } from "../utils";

export const useDeleteBasketError = (resDelete, setResDelete, setBasketUser) => {
    if(resDelete?.status == 200){
        let newProductList = [...resDelete?.data?.basket];
        document.getElementById("basketUnits-basketLogo").innerHTML= resDelete?.data?.basket.length == 0 ? "" : resDelete?.data?.basket.length;
        document.getElementById("basketUnits-basketLogo").style.display= resDelete?.data?.basket.length == 0 ? "none" : "block";
        setBasketUser([...newProductList])
        setResDelete(() => ({}));
        alertaSuccess("Se quitó el producto del carrito", 2000);
    }


    //? 404 No se puedo quitar

    if(resDelete?.response?.data?.message.includes("No se pudo quitar el producto del carrito")){
        setResDelete(() => {});
        alertaError("No se pudo quitar, inténtalo de nuevo", 2500);
    }


    //? 404 no se encontró el producto

    if(resDelete?.response?.data?.message.includes("No se encontró el producto en el carrito")){
        setResDelete(() => {});
        alertaError("Error, si persiste, reinicia sesión", 2500)
    }


    //? 404 error de testing

    if(resDelete?.response?.data?.message.includes("No se actualizó correctamente la DB")
    || resDelete?.response?.data?.message.includes("No se encontró un user con ese id en la DB")
    ){
        setResDelete(() => {});
        alertaError("Ha habido un error, inténtalo más tarde", 2500);
    }

    
    if(resDelete?.response?.status == 500){
        setResDelete(() => {});
        alertaError("Error en el servidor, inténtalo más tarde", 2500);
    }
}
