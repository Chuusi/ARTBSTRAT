export const useLoginError = (res,setRes,login,setLoginOk) => {
    

    //? RESPUESTA 200
    if(res?.status == 200){
        const dataCustom = {
            token: res.data.token,
            user: res.data.user.name,
            email: res.data.user.email,
            image: res.data.user.image,
            check: res.data.user.check,
            _id: res.data.user._id,
        }

        const stringUser = JSON.stringify(dataCustom);
        login(stringUser);
        setLoginOk(() => true);
    }
    
    if(res?.response?.data.message.includes("Contraseña incorrecta")){
        setRes(() => ({}));
        console.log("Contraseña incorrecta");
    }

    if(res?.response?.data.message.includes("No existe un usuario")){
        setRes(() => ({}));
        console.log("Usuario inexistente");
    }

    if(res?.response?.status == 500) {
        setRes(() => ({}));
        console.log("Error del servidor");
    }

    return (
        <div>useLoginError</div>
    )
}
