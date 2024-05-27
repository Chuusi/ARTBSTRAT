export const usePostError = (res, setRes, setPost) => {

    if(res?.status == 200){
        setPost(res);
        setRes({});
        console.log("Post traido con exito", res);

    }else{
        setRes({})
        console.log("❌ No se ha podido traer la informacion del post de la DB ❌", res);
    }
}