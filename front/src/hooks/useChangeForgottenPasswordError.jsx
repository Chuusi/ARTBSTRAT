export const useChangeForgottenPasswordError = (res, setRes, setChanged ) => {
    if(res?.status == 200){
        setChanged(true);
        setRes({});
        console.log("Contraseña cambiada con éxito");
    }else{
        setRes({});
        console.log("Algo salió mal");
    }
}