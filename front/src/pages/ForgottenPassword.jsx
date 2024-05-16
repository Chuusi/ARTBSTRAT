import { useForm } from "react-hook-form"
import "./ForgottenPassword.css"
import { useEffect, useState } from "react";
import { useForgottenPasswordError } from "../hooks/useForgottenPasswordError";
import { forgottenPassword } from "../services/user.service";
import { Navigate } from "react-router-dom";

export const ForgottenPassword = () => {
    
    const {handleSubmit, register} = useForm();
    const [send, setSend] = useState(false);
    const [res, setRes] = useState({});
    const [forgotOk, setForgotOk] = useState(false);


    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await forgottenPassword(formData));
        setSend(false);
    };

    useEffect(() => {
        useForgottenPasswordError(res, setRes, setForgotOk);
    },[res]);

    if(forgotOk){
        return <Navigate to="/login"/>
    }


    //? CSS reutilizado del login.css

    return (
        <>
        <div className="forgotten-container">
            <div className="login-form-container">
                <h2 className="login-title">¿Has olvidado tu contraseña?</h2>
                <h3 className="forgotten-subtitle">Introduce tu correo y te enviaremos un link</h3>
                <form className="login-form" onSubmit={handleSubmit(formSubmit)}>
                    <div className="login-input-container">
                        <label className="login-input-title" htmlFor="email">Correo</label>
                        <input 
                            className="login-input"
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="false"
                            {...register("email", {required: true})}
                        />
                    </div>

                    <div className="login-button-container">
                        <button 
                            className="login-submit-button"
                            type="submit"
                            disabled={send}
                        >
                            {send ? "Enviando..." : "Recibir un correo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
        
    )
}