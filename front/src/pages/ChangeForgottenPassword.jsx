import { useForm } from "react-hook-form";
import { useAuth } from "../context"
import "./ChangeForgottenPassword.css"
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { changeForgottenPassword } from "../services/user.service";
import { useChangeForgottenPasswordError } from "../hooks/useChangeForgottenPasswordError";

export const ChangeForgottenPassword = ({token}) => {
    
    const {setUser,login} = useAuth();
    const {handleSubmit, register} = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [changed, setChanged] = useState(false);


    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await changeForgottenPassword(token,formData));
        setSend(false);
    };

    useEffect(() => {
        if(res && Object.keys(res).length > 0){
            useChangeForgottenPasswordError(res,setRes,setChanged);
        }
    },[res]);

    if(changed){
        return <Navigate to="/profile"/>
    }

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2 className="login-title">Cambio de contraseña</h2>
                <h5 className="cfp-subtitle-1">Introduce una nueva contraseña</h5>
                <form className="login-form" onSubmit={handleSubmit(formSubmit)}>
                    <div className="login-input-container">
                        <label className="login-input-title" htmlFor="newPassword">Nueva contraseña  
                        <span 
                            className="material-symbols-outlined cfp-eye-icon"
                                onClick={
                                    () => {
                                        var x = document.getElementById("newPassword");
                                        if (x.type === "password") {
                                            x.type = "text";
                                        } else {
                                            x.type = "password";
                                        }
                                    }}
                            >visibility</span></label>
                        <input 
                            type="password" 
                            className="login-input" 
                            id="newPassword"
                            name="newPassword"
                            autoComplete="false"
                            placeholder="e.g. MJPass123"
                            {...register("newPassword", {required:true})}
                        />
                    </div>

                    <div className="login-input-container">
                        <label className="login-input-title" htmlFor="newPasswordCheck">Verificar nueva contraseña  
                        <span 
                            className="material-symbols-outlined cfpc-eye-icon"
                                onClick={
                                    () => {
                                        var x = document.getElementById("newPasswordCheck");
                                        if (x.type === "password") {
                                            x.type = "text";
                                        } else {
                                            x.type = "password";
                                        }
                                    }}
                            >visibility</span>  </label>
                        <input 
                            type="password" 
                            className="login-input" 
                            id="newPasswordCheck"
                            name="newPasswordCheck"
                            autoComplete="false"
                            placeholder="e.g. MJPass123"
                            {...register("newPasswordCheck", {required:true})}
                        />
                    </div>

                    <div className="login-button-container">
                        <button 
                            className="login-submit-button"
                            type="submit"
                            disabled={send}
                        >
                            {send ? "Enviando..." : "Cambiar contraseña"}
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}