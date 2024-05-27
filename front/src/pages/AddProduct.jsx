import { useForm } from "react-hook-form";
import "./AddProduct.css"
import { Uploadfile } from "../components";
import { useEffect, useState } from "react";
import { createProduct } from "../services/product.service";
import { useAddProductError } from "../hooks";
import { Navigate } from "react-router-dom";


export const AddProduct = () => {
    
    const {handleSubmit, register} = useForm();
    const [send, setSend] = useState();
    const [res, setRes] = useState({});
    const [added, setAdded] = useState(false)

    const formSubmit = async(formData) => {
        const inputFile = document.getElementById("file-upload").files;
        if(inputFile.length != 0){
            const customFormData = {
                ...formData,
                image: inputFile[0],
            };
            setSend(true);
            setRes(await createProduct(customFormData));
            setSend(false);
        } else {
            console.log("Añade una imagen de producto");
        };
    }
    
    useEffect(() => {
        console.log(res);
        useAddProductError(res, setRes, setAdded);
    },[res])
    
    if(added){
        return <Navigate to="/shop" />
    }

    return (
        <div className="profile-subcontainer">
            <div className="register-form-container">
                    <h2 className="register-title">Añadir producto</h2>
                    <h5 className="addProduct-subtitle">Los campos con * son obligatorios</h5>

                    <form className="addProduct-form" onSubmit={handleSubmit(formSubmit)}>
                        
                        
                        <div className="register-input-container addProduct-upload-container">
                            <p className="register-input-title profile-pic-register" >Foto del producto*</p>
                            <Uploadfile/>
                        </div>

                        <div className="addProduct-form-input-container">
                            <div className="register-input-container">
                                <label className="register-input-title" htmlFor="name">Nombre del producto*</label>
                                
                                <input 
                                    className="register-input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Nombre del producto"
                                    autoComplete="false"
                                    {...register("name", {required: true})}
                                />
                            </div>

                            <div className="register-input-container">
                                <label className="register-input-title" htmlFor="price">Precio*</label>
                                
                                <input 
                                    className="register-input"
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Ejemplo: 21.5"
                                    autoComplete="false"
                                    {...register("price", {required: true})}
                                    
                                />
                            </div>

                            <div className="register-input-container">
                                <label className="register-input-title" htmlFor="dimensions">Dimensiones</label>
                                
                                <input 
                                    className="register-input"
                                    type="text"
                                    id="dimensions"
                                    name="dimensions"
                                    placeholder="Ejemplo: 35cm x 20cm"
                                    autoComplete="false"
                                    {...register("dimensions", {required: false})}
                                />
                            </div>

                            

                            <div className="register-input-container">
                                <label className="register-input-title" htmlFor="composition">Composición</label>
                                
                                <input 
                                    className="register-input"
                                    type="text"
                                    id="composition"
                                    name="composition"
                                    autoComplete="false"
                                    placeholder="Ejemplo: 100% algodón"
                                    {...register("composition", {required: false})}
                                />
                            </div>

                            <div className="register-input-container">
                                <label className="register-input-title" htmlFor="stock">Stock</label>
                                
                                <input 
                                    className="register-input register-input-date"
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    autoComplete="false"
                                    placeholder="Ejemplo: 4"
                                    {...register("stock", {required: false})}
                                />
                            </div>

                            <div className="register-input-container">
                                <label className="register-input-title" htmlFor="composition">Descripción del producto</label>
                                
                                <textarea 
                                    className="register-input addProduct-description-input"
                                    type="text"
                                    id="description"
                                    name="description"
                                    autoComplete="false"
                                    placeholder="Descripción al gusto"
                                    {...register("description", {required: false})}
                                />
                            </div>

                            <div className="register-button-container addProduct-button-container">
                                <button
                                    className="register-submit-button"
                                    type="submit"
                                    disabled={send}
                                >
                                    {send ? "Añadiendo..." : "Añadir a la tienda"}
                                </button>
                            </div>
                        </div>
                        

                    
                    </form>
                </div>
        </div>
    )
}