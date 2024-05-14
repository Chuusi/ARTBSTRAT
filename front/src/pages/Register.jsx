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
        console.log("allUser almacenado");
    },[allUser]);


    //? Navegación

    if(okRegister) {
        return <Navigate to="/checkUser" />
    }


    //? Elemento a devolver
    
    return (
        <>
            <div>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="register-input">
                        <label htmlFor="name">Nombre de usuario*</label>
                        
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="false"
                            {...register("name", {required: true})}
                        />
                    </div>

                    <div className="register-input">
                        <label htmlFor="email">Correo*</label>
                        
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="false"
                            {...register("email", {required: true})}
                        />
                    </div>

                    <div className="register-input">
                        <label htmlFor="email">Contraseña*</label>
                        
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="false"
                            {...register("password", {required: true})}
                        />
                    </div>

                    <div className="register-input">
                        <label htmlFor="email">Dirección postal</label>
                        
                        <input 
                            type="text"
                            id="address"
                            name="address"
                            autoComplete="false"
                            {...register("address", {required: false})}
                        />
                    </div>

                    <div className="register-input">
                        <label htmlFor="email">Fecha de nacimiento</label>
                        
                        <input 
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            autoComplete="false"
                            {...register("dateOfBirth", {required: false})}
                        />
                    </div>

                    <div className="register-input">
                        <p>Foto de perfil</p>
                        <Uploadfile/>
                    </div>

                    <div className="register-button-container">
                        <button
                            type="submit"
                            disabled={send}
                        >
                            {send ? "Cargando..." : "Registrarse"}
                        </button>
                    </div>

                    <div className="register-terms-anchor">
                        <small>
                            Haciendo click en "Registrarse", aceptas nuestros{" "}
                            <Link to="/termsAndConditions">Términos & condiciones</Link>
                        </small>
                    </div>

                    <div className="register-form-footer">
                        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}