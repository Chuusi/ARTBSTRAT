import { useEffect, useState } from "react";
import "./Login.css"
import {useForm} from "react-hook-form"
import { useAuth } from "../context";
import { loginUser } from "../services/user.service";
import { Link, Navigate } from "react-router-dom";
import { useLoginError } from "../hooks/useLoginError";


export const Login = () => {
    
    //? Estados

    const {register, handleSubmit} = useForm();
    const [res,setRes] = useState({});
    const [send,setSend] = useState(false);
    const [loginOk, setLoginOk] = useState(false);
    const {login, setUser} = useAuth();

    //? Gestión de la data del formulario

    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await loginUser(formData));
        setSend(false);
    }

    //? Gestión de respuestas con useEffect

    useEffect(() => {
        useLoginError(res, setRes, login, setLoginOk)
    }, [res]);
    
    //? Gestión de la navegación

    if(loginOk){
        if(res.data.user.check == false){
            return <Navigate to="/checkUser"/>
        } else {
            return <Navigate to="/"/>
        }
    }

    return (
        <>
        <div className="login-container">
            <div className="login-form-container">
                <h2 className="login-title">Iniciar sesión</h2>
                <form className="login-form" onSubmit={handleSubmit(formSubmit)}>
                    <div className="login-input-container">
                        <label className="login-input-title" htmlFor="custom-imput">
                            Correo
                        </label>
                        <input 
                            className="login-input"
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="true"
                            placeholder="Correo"
                            {...register("email", {required:true})}
                        />
                        
                    </div>
                    <div className="login-input-container">
                        <label className="login-input-title" htmlFor="custom-imput">
                            Contraseña  <span 
                                className="material-symbols-outlined login-eye-icon"
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
                            autoComplete="false"
                            placeholder="Contraseña"
                            {...register("password", {required:true})}
                        />
                        
                    </div>

                    <div className="login-button-container">
                        <button 
                            className="login-submit-button"
                            type="submit"
                            disabled={send}>
                            {send ? "Iniciando sesión..." : "Iniciar sesión"}
                        </button>
                    </div>
                    
                    <div className="login-footer">
                        <p><Link to="/forgottenPassword">¿Has olvidado tu contraseña?</Link></p>
                        <p>Si no tienes una cuenta, <Link to="/register">registrate aquí.</Link></p>
                    </div>

                </form>
            </div>
        </div>
        
        </>
    )
}