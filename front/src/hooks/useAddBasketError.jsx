import { alertaSuccess, alertaError } from "../utils";

export const useAddBasketError = (resBasket, setResBasket) => {
    if(resBasket.status == 200){
        document.getElementById("basketUnits-basketLogo").innerHTML= resBasket?.data?.basket.length == 0 ? "" : resBasket?.data?.basket.length;
        document.getElementById("basketUnits-basketLogo").style.display= resBasket?.data?.basket.length == 0 ? "none" : "block";
        setResBasket(() => ({}))
        alertaSuccess("Producto añadido a la cesta", 1500);
    }

    
    //? 404 no quedan en stock

    if(resBasket?.response?.data?.message.includes("No quedan existencias del producto en stock")){
        alertaError("No quedan productos en stock", 2000);
        setResBasket(() => {});
    }

    
    //? 404 fallo al añadir en DB

    if(resBasket?.response?.data.message.includes("No se pudo añadir el producto al carrito")
    || resBasket?.response?.data.message.includes("El carrito no se actualizó correctamente")){
        alertaError("Error al añadir en el carrito, inténtalo más tarde", 2000);
        setResBasket(() => {});
    }


    //? 404 testing buscando user

    if(resBasket?.response?.data.message.includes("No se encontró el user por id en el testeo")){
        alertaError("Error al añadir en el carrito, inténtalo más tarde o inicia sesión", 2000);
        setResBasket(() => {});
    }

    if(resBasket?.response?.status == 500){
        alertaError("Ha habido un fallo en el servidor, inténtalo más tarde", 2000);
        setResBasket(() => {})
    }

    else{
        alertaError("Error inesperado", 2000);
        setResBasket(() => {})
    }
}
