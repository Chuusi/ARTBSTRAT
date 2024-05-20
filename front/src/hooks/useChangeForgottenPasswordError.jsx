export const useChangeForgottenPasswordError = (res, setRes, setChanged ) => {
    if(res?.status == 200){
        setChanged(true);
        setRes({});
        console.log("Contraseña cambiada con éxito");
    } else if (res && res.status !== 200)
        console.log("Algo salió mal");

    if(res?.response?.data?.message.includes("La contraseña no se cambió con éxito")) {
        console.log("La contraseña no se cambió con éxito");
    }

    if(res?.response?.data?.message.includes("Error en el cambio de contraseñas en la DB")) {
        console.log("Error en el cambio de contraseñas en la DB");
    }

    if(res?.response?.data?.message.includes("Las nuevas contraseñas no coinciden")) {
        console.log("Las nuevas contraseñas no coinciden");
    }

    if(res?.response?.data?.message.includes("La nueva contraseña no es segura")) {
        console.log("La nueva contraseña no es segura");
    }

    if(res?.response?.data?.message.includes("Error en el try/catch general del changeForgottenPassword")) {
        console.log("Error en el try/catch general del changeForgottenPassword");
    }
}