export const useProductError = (res, setRes, setProduct) => {

    if(res?.status == 200){
        setProduct(res);
        setRes({});
        console.log("Producto traido con exito", res);

    }else{
        setRes({})
        console.log("Fatal", res);
    }
}