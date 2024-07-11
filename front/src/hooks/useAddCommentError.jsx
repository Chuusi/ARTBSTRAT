import { alertaSuccess, alertaError } from "../utils";

export const useAddCommentError = (resAddComment, setResAddComment, setCommentList, commentList) => {

    if(resAddComment?.status == 200) {
        setCommentList([...commentList, resAddComment.data.commentRes]);
        setResAddComment({});
        alertaSuccess("Comentario añadido", 1500);
    }


    //? 404 no se actualizó alguna de las listas (comentarios o user)

    if(resAddComment?.response?.data?.message.includes("No se ha podido actualizar la lista de comentarios del usuario al crear el comentario")
    || resAddComment?.response?.data?.message.includes("No se ha podido actualizar la lista de comentarios del post")
    ){
        setResAddComment(() => {});
        alertaError("Error al publicar comentario, reinténtalo más tarde", 2500);
    }


    //? 404 no se creó el comentario

    if(resAddComment?.response?.data?.message.includes("Se ha producido un error al crear el comentario")){
        setResAddComment(() => {});
        alertaError("Error al crear el comentario", 2000);
    }

    if(resAddComment?.response?.status == 500){
        setResAddComment(() => {});
        alertaError("Error en el servidor, inténtalo más tarde", 2500);
    }
}

