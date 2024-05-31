export const useGetProductIdError = (result, setProductsBasket, productListUpdated) => {
    if(result?.status == 200){
        productListUpdated.push(result?.data)

    }
    else{
        console.log("Se ha producido un error al traer los productos del usuario", result);
    }
}
