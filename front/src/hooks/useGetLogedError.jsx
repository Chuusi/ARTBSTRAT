export const useGetLogedError = (res, setRes) => {

    if(res?.status == 200){
        setRes(res?.data);
    }

    if(res?.response?.status == 500){
        console.log("No hay un usuario logueado");
    }

}
