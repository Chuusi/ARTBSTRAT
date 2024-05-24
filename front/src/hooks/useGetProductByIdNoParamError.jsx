
export const useGetProductByIdNoParamError = (res, setRes, favList, setFavList) => {
    if(res?.status == 200){
        console.log("res.data", res?.data);

        setFavList([...favList, res?.data])

        setRes(() => ({}));
    }
    else{
        console.log("No sabemos hacer eso");
    }
}
