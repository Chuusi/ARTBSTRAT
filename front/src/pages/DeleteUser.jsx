import { useForm } from "react-hook-form";
import "./DeleteUser.css"
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import { deleteUser } from "../services/user.service";
import { useDeleteUserError } from "../hooks/";
import { useAuth } from "../context";

export const DeleteUser = () => {
    
    const [send, setSend] = useState(false);
    const [res,setRes] = useState({})
    const [phrase, setPhrase] = useState("");
    const [value, setValue] = useState("");
    const [deleting, setDeleting] = useState(false)
    const {logout, setUser} = useAuth();
    
    const formSubmit = async(e) => {
        e.preventDefault();
        
        if(value == "borrar mi cuenta"){
            if(window.confirm("¿Seguro que quieres borrar tu cuenta?")){
                setSend(true);
                setRes(await deleteUser());
                setSend(false);
            }
        } else{
            return <Navigate to="/gallery"/>
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        useDeleteUserError(res,setRes, setDeleting, setUser)
    },[res])

    if(deleting){
        logout();
        return <Navigate to="/"/>
    }

    return (
        <div className="profile-subcontainer">
            <div className="login-form-container">
                <h2 className="login-title">Borrar cuenta</h2>
                <h4 className="delete-subtitle-1">Escribe en el recuadro "borrar mi cuenta" y haz click en el botón</h4>
                <form className="login-form" onSubmit={formSubmit}>
                    <div className="login-input-container">

                        <input 
                            className="login-input"
                            type="deleteAcount"
                            id="deleteAcount"
                            name="deleteAcount"
                            value={value}
                            onChange={handleChange}
                            autoComplete="true"
                            placeholder="Recuadro"
                        />
                        
                    </div>

                    <div className="login-button-container">
                        <button 
                            className="login-submit-button"
                            type="submit"
                            disabled={send}>
                            {send ? "Borrando..." : "Borrar"}
                        </button>
                    </div>
                    
                    <div className="login-footer">
                        <p>Al hacer click y borrar tu cuenta<br></br>se perderán todos los datos almacenados</p>
                    </div>

                </form>
            </div>
        </div>
    )
}