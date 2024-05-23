import { useEffect, useState } from "react";
import "./CheckUser.css"
import { useAuth } from "../context";
import { Navigate, useNavigate } from "react-router-dom";
import { checkUser, resendCheckCode } from "../services/user.service";
import { useCheckUserError } from "../hooks/useCheckUserError";
import { useForm } from "react-hook-form";
import { useResendCodeError } from "../hooks/useResendCheckCodeError";
import { useAutoLogin } from "../hooks/useAutoLoginError";

export const CheckUser = () => {
    
    //? Estados

    //const navigate = useNavigate();
    const [ res, setRes ] = useState({});
    const [ resResend, setResResend ] = useState({})
    const [ send, setSend ] = useState(false);
    const [ okCheck, setOkCheck ] = useState(false);
    const [ okDeleteUser, setOkDeleteUser ] = useState(false)
    const [ userNotFound, setUserNotFound ] = useState(false)
    const { allUser, login, setUser } = useAuth();
    const { register, handleSubmit } = useForm();

    const formSubmit = async(formData) => {

        const tryCheck = formData?.checkCode;
        const userLocal = localStorage.getItem("user");

        if(userLocal == null){
            //? Viene del register
            const customFormData = {
                checkCode:tryCheck,
                email: allUser.data.user.email,
            }

            setSend(true);
            setRes(await checkUser(customFormData));
            setSend(false);

        } else {
            //? Viene del login
            const parseUser = JSON.parse(userLocal);
            const customFormData = {
                checkCode : parseInt(formData.checkCode),
                email: parseUser.email,
            };

            setSend(true);
            setRes(await checkUser(customFormData));
            setSend(false);
        };
    };


    //? Gestión del reenvío de código

    const handleReSend = async () => {
        const userLocal = localStorage.getItem("user");
        if(userLocal != null){
            const parseUser = JSON.parse(userLocal);
            const customFormData = {
                name: parseUser.name,
                email: parseUser.email,
            };
            console.log(customFormData);
            setSend(true);
            setResResend(await resendCheckCode(customFormData));
            setSend(false);
        } else {
            const customFormData = {
                name: allUser?.data?.user?.name,
                email: allUser?.data?.user?.email,
            };

            setSend(true);
            setResResend(await resendCheckCode(customFormData));
            setSend(false);
        }
    };


    //? useEffect checkCode

    useEffect(() => {
        useCheckUserError(
            res,
            setRes,
            setOkCheck,
            setOkDeleteUser,
            login,
            setUserNotFound
        )
    },[res])
    
    //? useEffect resendCode

    useEffect(() => {
        useResendCodeError(
            resResend,
            setResResend,
            setUserNotFound,
        )
    },[resResend]);


    if(okCheck) {
        if(!localStorage.getItem("user")){
            useAutoLogin(allUser, login)
        } else {
            return <Navigate to="/"/>
        }
    }

    if(okDeleteUser) {
        return <Navigate to="/register"/>
    }

    if(userNotFound) {
        return <Navigate to="/login"/>
    }

    return (
        <>
        <div className="checkuser-container login-container">
            <div className="checkUser-form-container login-form-container">
                <h2 className="login-title">Introduce el código que hemos enviado</h2>
                <form className="check-form" onSubmit={handleSubmit(formSubmit)}>
                    <div className="login-input-container">
                        <label className="check-input-title" htmlFor="checkCode">Código</label>
                        <input 
                            className="check-input"
                            type="number" 
                            id="checkCode"
                            name="checkCode"
                            autoComplete="false"
                            {...register("checkCode", {required: false})}
                        />
                    </div>

                    <div className="check-button-container">
                        <div className="checkUser-submitButton">
                            <button
                                className="check-submit-button"
                                id="checkUser-submit"
                                type="submit"
                                disabled={send}
                            >
                                {send ? "Espera..." : "Verificar código"}
                            </button>
                        </div>

                        <div className="checkUser-resendButton">
                            <button
                                className="check-submit-button"
                                id="checkUser-resend"
                                disabled={send}
                                onClick={() => handleReSend()}
                            >
                                {send ? "Espera..." : "Reenviar código"}
                            </button>
                        </div>
                    </div>
                    

                    <p>Atención! El usuario será borrado si se falla 3 veces la verificación de código</p>
                </form>
            </div>
        </div>
        
        </>
    )
}