export const useGetLogedUserError = (res, setRes, setBasketUser) => {

    if(res?.status == 200){
        setRes(res?.data);
        setBasketUser(res?.data?.basket)
    }

    if(res?.response?.status == 500){
        console.log("No sabemos hacer esto", res);
    }

}
