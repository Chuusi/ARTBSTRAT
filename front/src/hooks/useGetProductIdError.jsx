export const useGetProductIdError = (result, setProductsBasket, productListUpdated,totalPrice, setTotalPrice) => {
    if(result?.status == 200){
        console.log("Se ha actualzido la cesta del usuario", result);
        setTotalPrice(totalPrice => totalPrice + result?.data?.price)
        console.log(totalPrice,"dentro del use");
        productListUpdated.push(result?.data)

    }
    else{
        console.log("Se ha producido un error al traer los productos del usuario", result);
    }
}
