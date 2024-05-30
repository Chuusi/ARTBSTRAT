export const useGetProductIdError = (result, setProductsBasket, productListUpdated, setTotalPrice, totalPrice) => {
    if(result?.status == 200){
        console.log("Se ha actualzido la cesta del usuario", result);
        productListUpdated.push(result?.data)
        setTotalPrice(totalPrice+result?.data?.price)
    }
    else{
        console.log("Se ha producido un error al traer los productos del usuario", result);
    }
}
