import { useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import "./Register.css"
import { registerUser } from "../services/user.service";
import { useRegisterError } from "../hooks/useRegisterError";
import { useAuth } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { Uploadfile } from "../components";


export const Register = () => {
    
    //? Estados
    const {allUser, setAllUser, bridgeData} = useAuth();
    const [ res, setRes ] = useState({});
    const [ send, setSend ] = useState(false);
    const [okRegister, setOkRegister] = useState(false);
    const {register, handleSubmit} = useForm();


    //? Control del formulario
    const formSubmit = async(formData) => {
        
        //? Traemos los archivos que pueda haber en el UploadFile
        const inputFile = document.getElementById("file-upload").files;

        if(inputFile.length != 0){
            const customFormData = {
                ...formData,
                image: inputFile[0],
            };

            setSend(true);
            setRes(await registerUser(customFormData));
            setSend(false);
        } else {
            const customFormData = {
                ...formData,
            };

            setSend(true);
            setRes(await registerUser(customFormData));
            setSend(false);
        };

    };


    //? useEffect

    useEffect(() => {
        console.log("Respuesta del register", res);
        useRegisterError(res, setOkRegister, setRes);
        
        //? Almacenamos la data de la respuesta en el estado allUser
        if(res?.status == 200) bridgeData("ALLUSER");
    },[res]);

    useEffect(() => {
        console.log("allUser almacenado", allUser);
    },[allUser]);


    //? Navegación

    if(okRegister) {
        return <Navigate to="/checkUser" />
    }


    //? Elemento a devolver
    
    return (
        
            <div className="register-container">
                <div className="register-form-container">
                    <h2 className="register-title">Registro</h2>
                    <h5 className="register-subtitle-1">Regístrate para estar al tanto de nuestras ofertas</h5>
                    <h5 className="register-subtitle-2"> y poder participar en nuestra comunidad</h5>
                    <h5 className="register-subtitle-2">Los campos con * son obligatorios</h5>

                    <form className="register-form" onSubmit={handleSubmit(formSubmit)}>
                        <div className="register-input-container">
                            <label className="register-input-title" htmlFor="name">Nombre de usuario*</label>
                            
                            <input 
                                className="register-input"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="e.g. PeterP"
                                autoComplete="false"
                                {...register("name", {required: true})}
                            />
                        </div>

                        <div className="register-input-container">
                            <label className="register-input-title" htmlFor="email">Correo*</label>
                            
                            <input 
                                className="register-input"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="e.g. email@example.com"
                                autoComplete="false"
                                {...register("email", {required: true})}
                            />
                        </div>

                        <div className="register-input-container">
                            <label className="register-input-title" htmlFor="email">Contraseña*  <span 
                                className="material-symbols-outlined eye-icon"
                                onClick={
                                    () => {
                                        var x = document.getElementById("password");
                                        if (x.type === "password") {
                                            x.type = "text";
                                        } else {
                                            x.type = "password";
                                        }
                                    }}
                            >visibility</span></label>
                            
                            <input 
                                className="register-input"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="e.g. MJPass123"
                                autoComplete="false"
                                {...register("password", {required: true})}
                                
                            />
                        </div>

                        <div className="register-input-container">
                            <label className="register-input-title" htmlFor="email">Dirección postal</label>
                            
                            <input 
                                className="register-input"
                                type="text"
                                id="address"
                                name="address"
                                autoComplete="false"
                                placeholder="e.g. 69th Road, en Forest Hills"
                                {...register("address", {required: false})}
                            />
                        </div>

                        <div className="register-input-container">
                            <label className="register-input-title" htmlFor="email">Fecha de nacimiento</label>
                            
                            <input 
                                className="register-input register-input-date"
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                autoComplete="false"
                                placeholder="e.g. 01/08/62"
                                {...register("dateOfBirth", {required: false})}
                            />
                        </div>

                        <div className="register-input-container">
                            <p className="register-input-title profile-pic-register" >Foto de perfil</p>
                            <Uploadfile/>
                        </div>

                        <div className="register-button-container">
                            <button
                                className="login-submit-button"
                                type="submit"
                                disabled={send}
                            >
                                {send ? "Cargando..." : "Registrarse"}
                            </button>
                        </div>

                        <div className="register-terms-anchor">
                            <small>
                                Haciendo click en "Registrarse", aceptas nuestros{" "}
                                <Link target="_blank" to="/termsAndConditions">Términos & condiciones</Link>
                            </small>
                        </div>

                        <div className="register-form-footer">
                            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                        </div>
                    </form>
                </div>
                
            </div>
        
    )
}