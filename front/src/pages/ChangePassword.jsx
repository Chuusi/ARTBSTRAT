import { useForm } from "react-hook-form";
import "./ChangePassword.css"
import { useEffect, useState } from "react";
import { changePassword } from "../services/user.service";
import { useChangePasswordError } from "../hooks/useChangePasswordError";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const ChangePassword = () => {
    
    const {setUser} = useAuth();
    const {register,handleSubmit} = useForm();
    const [send, setSend] = useState(false);
    const [res, setRes] = useState({})
    const [changed, setChanged] = useState(false)

    const formSubmit = async(formData) => {
        const {password, newPassword, checkNewPassword} = formData;
        const customFormData = {
            password,
            newPassword
        }
        if(newPassword == checkNewPassword){
            setSend(true);
            setRes(await changePassword(customFormData));
            setSend(false);
        } else{
            console.log("Las contraseñas no coinciden");
        }
    }

    useEffect(() => {
        useChangePasswordError(res,setRes,setUser,setChanged);
    },[res])
    
    if(changed){
        return <Navigate to="/login"/>
    }

    return (
        <div className="profile-subcontainer">
            <div className="login-form-container">
                <h2 className="login-title">Cambiar contraseña</h2>
                <form className="login-form" onSubmit={handleSubmit(formSubmit)}>
                    <div className="login-input-container">
                        <label className="login-input-title" htmlFor="password">
                            Antigua contraseña <span 
                                className="material-symbols-outlined change-pass-eye-icon"
                                onClick={
                                    () => {
                                        var x = document.getElementById("password");
                                        if (x.type === "password") {
                                            x.type = "text";
                                        } else {
                                            x.type = "password";
                                        }
                                    }}
                            >visibility</span>
                        </label>
                        <input 
                            className="login-input"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="true"
                            placeholder="Antigua contraseña"
                            {...register("password", {required:true})}
                        />
                        
                    </div>

                    <div className="login-input-container">
                        <label className="login-input-title" htmlFor="newPassword">
                            Nueva contraseña  <span 
                                className="material-symbols-outlined change-new-pass-eye-icon"
                                onClick={
                                    () => {
                                        var x = document.getElementById("newPassword");
                                        if (x.type === "password") {
                                            x.type = "text";
                                        } else {
                                            x.type = "password";
                                        }
                                    }}
                            >visibility</span>
                        </label>
                        <input 
                            className="login-input"
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            autoComplete="false"
                            placeholder="Nueva contraseña"
                            {...register("newPassword", {required:true})}
                        />
                        
                    </div>

                    <div className="login-input-container">
                        <label className="login-input-title" htmlFor="newPassword">
                            Verificar nueva contraseña  <span 
                                className="material-symbols-outlined change-new-check-pass-eye-icon"
                                onClick={
                                    () => {
                                        var x = document.getElementById("checkNewPassword");
                                        if (x.type === "password") {
                                            x.type = "text";
                                        } else {
                                            x.type = "password";
                                        }
                                    }}
                            >visibility</span>
                        </label>
                        <input 
                            className="login-input"
                            type="password"
                            id="checkNewPassword"
                            name="checkNewPassword"
                            autoComplete="false"
                            placeholder="Verificar nueva contraseña"
                            {...register("checkNewPassword", {required:true})}
                        />
                        
                    </div>

                    <div className="login-button-container">
                        <button 
                            className="login-submit-button"
                            type="submit"
                            disabled={send}>
                            {send ? "Cambiando..." : "Cambiar"}
                        </button>
                    </div>
                    

                </form>
            </div>
        </div>
    )
}