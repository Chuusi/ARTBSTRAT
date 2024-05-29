export const useAddPostError = (res, setRes, setAdded) => {
    if(res.status == 200) {
        setAdded(() => true);
        console.log("Post añadido con éxito", res);
    }

    else{
        console.log("Algo ha ido mal", res);
    }
}
