export const useGetCommentError = (result, setResComments, setCommentList, commentListUpdated) => {
    
    if(result?.status == 200){
        commentListUpdated.push(result.data);
    }
    /* else{
        console.log("Se ha producido un error al traer los comentarios de este post", result);
    } */
}