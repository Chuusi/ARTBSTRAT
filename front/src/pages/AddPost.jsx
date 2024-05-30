import { useEffect, useState } from "react";
import { Uploadfile } from "../components";
import "./AddPost.css"
import { useForm } from "react-hook-form";
import { createPost } from "../services/post.service";
import { useAddPostError } from "../hooks";
import { Navigate } from "react-router-dom";


export const AddPost = () => {
    
    const {handleSubmit, register} = useForm();
    const [send, setSend] = useState(false);
    const [res, setRes] = useState({})
    const [added, setAdded] = useState(false)

    const formSubmit = async(formData) => {
        const inputFile = document.getElementById("file-upload").files;
        if(inputFile.length != 0){
            const customFormData = {
                ...formData,
                image: inputFile[0],
            };
            setSend(true);
            setRes(await createPost(customFormData));
            setSend(false);
        } else {
            console.log("Añade una imagen para el post");
        };
    };

    useEffect(() => {
        if(res && Object.keys(res).length > 0){
            useAddPostError(res, setRes, setAdded);
        }
    },[res])



    if(added){
        return <Navigate to="/gallery"/>
    }

    return (
        <div className="profile-subcontainer">
            <div className="register-form-container">
                    <h2 className="register-title">Añadir post</h2>
                    <h5 className="addProduct-subtitle">Los campos con * son obligatorios</h5>

                    <form className="addPost-form" onSubmit={handleSubmit(formSubmit)}>
                        
                        
                        <div className="register-input-container addProduct-upload-container">
                            <p className="register-input-title profile-pic-register" >Imagen del post*</p>
                            <Uploadfile/>
                        </div>

                        <div className="addProduct-form-input-container">
                            <div className="register-input-container">
                                <label className="register-input-title" htmlFor="name">Título</label>
                                
                                <input 
                                    className="register-input"
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Título del post"
                                    autoComplete="false"
                                    {...register("title")}
                                />
                            </div>


                            <div className="addPost-button-container">
                                <button
                                    className="register-submit-button"
                                    type="submit"
                                    disabled={send}
                                >
                                    {send ? "Añadiendo..." : "Añadir a la galería"}
                                </button>
                            </div>
                        </div>
                        

                    
                    </form>
                </div>
        </div>
    )
}