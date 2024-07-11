
export const useGetProductByIdNoParamError = (result, setRes, setFavList, updatedFavList) => {
    
    if(result?.status == 200){
        updatedFavList.push(result.data);
    }
    else{
        console.log("Error en la obtención de producto byID", result);
    }
}
