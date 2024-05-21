import Swal from "sweetalert2"

export const useAddFavPostError = (res, setRes) => {

    //? ----> STATUS 200 : TODO OKEY
    if(res?.status == 200){
        setRes(()=>({}))
        console.log("La lista de favoritos se ha actualizado con éxito ✅");
    }


    //? ----> STATUS 404 
    if(res?.status == 404){
        //DEFINIR ERRORES 404 res.status.message.include()
    }


    //? ----> STATUS 500 : ERROR DEL SERVIDOR 
    if(res?.status == 500){
        setRes(()=>({}))
        Swal.fire({
            icon: "error",
            title: "Lo sentimos",
            text: "Parece que ha habido un error en el servidor. Intentelo de nuevo más tarde",
            showCloseButton: true,
        })
    }
}