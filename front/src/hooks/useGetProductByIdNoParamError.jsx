
export const useGetProductByIdNoParamError = (result, setRes, setFavList, updatedFavList) => {
    
    if(result?.status == 200){
        updatedFavList.push(result.data);
        console.log("updatedFavList hook", updatedFavList);
    }
    else{
        console.log("No sabemos hacer eso");
    }
}
