import { useForm } from "react-hook-form"
import "./UpdateUser.css"
import { getLogedUser, updateUser } from "../services/user.service";
import { Uploadfile } from "../components";
import { useAuth } from "../context";
import { useEffect, useState } from "react";
import { useUpdateUserError } from "../hooks/useUpdateUserError";
import { Navigate } from "react-router-dom";


export const UpdateUser = () => {
    
    const {register, handleSubmit} = useForm();    
    const {user, login} = useAuth();
    const [res, setRes] = useState({});
    const [infoUser, setInfoUser] = useState({});
    const [send, setSend] = useState(false);
    const [updateOk, setUpdateOk] = useState(false);

    
    //? Almacenamos la info del user en un estado
    const getAllInfoUser = async() =>{
        setInfoUser(await getLogedUser());
    }


    if(infoUser.data == undefined){
        getAllInfoUser();
    }



    //? Formulario y llamada a la función del back
    const formSubmit = async(formData) => {
        const inputFile = document.getElementById("file-upload").files;

        //? Fallo en el defaultValue, verificamos que el valor no viene vacío
        //? En caso de venir vacío, pone el valor por defecto
        const customDefaultData = {
            name: formData?.name == "" ? infoUser?.data?.name : formData?.name,
            address: formData?.address == "" ? infoUser?.data?.address : formData?.address,
            dateOfBirth: formData?.dateOfBirth == "" ? infoUser?.data?.dateOfBirth : formData?.dateOfBirth,
        }


        if(inputFile.length != 0){
            const customFormData = {
                ...customDefaultData,
                image: inputFile[0],
            };

            setSend(true);
            setRes(await updateUser(customFormData));
            setSend(false);
        } else {
            const customFormData = {
                ...customDefaultData,
            };

            setSend(true);
            setRes(await updateUser(customFormData));
            setSend(false);
        };
    }
    

    useEffect(() => {
        useUpdateUserError(res, setRes, login, setUpdateOk);
    }, [res])

    if(updateOk){
        return <Navigate to="/profile"/>
    }

    //cosas que updatear: name, address, dateOfBirth, image

    return (
        <div className="profile-subcontainer">
            <div className="register-form-container">
                <h3 className="register-title">Actualizar información</h3>
                <form className="update-form" onSubmit={handleSubmit(formSubmit)}>

                    <div className="register-input-container">
                        <label className="register-input-title" htmlFor="name">Nombre de usuario</label>
                        <input 
                            className="register-input"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre de usuario"
                            autoComplete="false"
                            defaultValue={infoUser?.data?.name}
                            {...register("name", {required: false})}
                        />
                    </div>

                    <div className="register-input-container">
                        <label className="register-input-title" htmlFor="address">Dirección postal</label>
                        <input 
                            className="register-input"
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Dirección postal"
                            autoComplete="false"
                            defaultValue={infoUser?.data?.address}
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
                            defaultValue={infoUser?.data?.dateOfBirth == "" ? "21/05/2024" : infoUser?.data?.dateOfBirth}
                            {...register("dateOfBirth", {required: false})}
                        />
                    </div>

                    <div className="register-input-container">
                        <p className="register-input-title profile-pic-register" >Foto de perfil</p>
                        <Uploadfile/>
                    </div>

                    <div className="register-button-container">
                        <button
                            className="register-submit-button"
                            type="submit"
                            value="Submit"
                            disabled={send}
                        >
                            {send ? "Actualizando..." : "Actualizar"}
                        </button>
                        
                    </div>

                </form>
            </div>
        
        </div>
    )
}