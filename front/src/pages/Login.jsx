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
        <div>
            <form onSubmit={handleSubmit(formSubmit)}>

                <div className="login-email-input">
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="true"
                        {...register("email", {required:true})}
                    />
                    <label htmlFor="custom-imput">
                        Email
                    </label>
                </div>
                <div className="login-password-input">
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="false"
                        {...register("password", {required:true})}
                    />
                    <label htmlFor="custom-imput">
                        Contraseña
                    </label>
                </div>

                <button 
                    type="submit"
                    disabled={send}>
                    {send ? "Iniciando sesión..." : "Iniciar sesión"}

                </button>
                <div className="login-footer">
                    <p><Link to="/forgottenPassword">¿Has olvidado tu contraseña?</Link></p>
                    <p>Si no tienes una cuenta, <Link to="/register">registrate aquí.</Link></p>
                </div>

            </form>
        </div>
        </>
    )
}