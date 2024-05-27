export const useAddProductError = (res, setRes, setAdded) => {
    if(res?.status == 200){
        setRes(() => {});
        setAdded(() => true);
        console.log("Producto añadido a la tienda");
    }

    if(res?.response?.data?.message?.includes("No se ha podido guardar el nuevo producto en la DB")){
        console.log("No se ha podido guardar el nuevo producto en la DB");
        setRes(() => {});
    }

    if(res?.response?.data?.message?.includes("No se ha podido llevar a cabo la creación de un nuevo producto en la DB")){
        console.log("No se ha podido llevar a cabo la creación de un nuevo producto en la DB");
        setRes(() => {});
    }

    if(res?.response?.data?.message?.includes("Solo un administrador puede crear nuevos productos en esta página")){
        console.log("Solo un administrador puede crear nuevos productos en esta página");
        setRes(() => {});
    }
}
