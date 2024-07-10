import { alertaSuccess, alertaError } from "../utils";

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
        alertaSuccess("Sesión iniciada con éxito",1500)
    }
    
    if(res?.response?.data.message.includes("Contraseña incorrecta")){
        setRes(() => ({}));
        alertaError("Contraseña incorrecta", 2000)
    }

    if(res?.response?.data.message.includes("No existe un usuario")){
        setRes(() => ({}));
        alertaError("Usuario no registrado", 2000)
    }

    if(res?.response?.status == 500) {
        setRes(() => ({}));
        alertaError("Error del servidor", 2000)
    }

    return (
        <div>useLoginError</div>
    )
}
