import { Link, NavLink } from "react-router-dom"
import "./NavProfile.css"
import { useEffect, useState } from "react"
import { getLogedUser } from "../services/user.service"
import { useGetLogedError } from "../hooks"


export const NavProfile = () => {
    
    const [res, setRes] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    const infoUser = async() => {
        setRes(await getLogedUser())
    }

    //Nada más cargar la página carga el infoUser para después determinar si es admin
    useEffect(() => {
        infoUser();
    },[]);

    useEffect(() => {
        if(res && Object.keys(res).length > 0){
            useGetLogedError(res, setRes);
            setIsAdmin(res?.role === "admin" ? true : false);
        }
    },[res])

    /* let isAdmin = false;
    if(infoUser?.data?.role === "admin"){
        isAdmin = true;
    } else{
        isAdmin = false;
    } */

    return (
        <div className="nav-profile-container">
            <div className="nav-profile">
                
                
                <div className="nav-profile-favProducts  nav-profile-link-container">
                    <NavLink className="link-text" to="/profile/userFavProducts">
                        <p className="nav-profile-title"><span className="material-symbols-outlined nav-profile-icon">
                        favorite
                        </span>Lista de favoritos</p>
                    </NavLink>
                </div>
                
                <div className="nav-profile-updateUser nav-profile-link-container">
                    <NavLink className="link-text" to="/profile/updateUser">
                        <p className="nav-profile-title"><span className="material-symbols-outlined nav-profile-icon">
                        settings
                        </span>Modificar mis datos</p>
                    </NavLink>
                </div>

                <div className="nav-profile-updateUser nav-profile-link-container">
                    <NavLink className="link-text" to="/profile/changePassword">
                        <p className="nav-profile-title"><span className="material-symbols-outlined nav-profile-icon">
                        passkey
                        </span>Cambiar contraseña</p>
                    </NavLink>
                </div>

                {isAdmin && (
                    <div className="nav-profile-updateUser nav-profile-link-container">
                        <NavLink className="link-text" to="/profile/addPost">
                            <p className="nav-profile-title"><span className="material-symbols-outlined nav-profile-icon">
                            add_photo_alternate
                            </span>Añadir nuevo post</p>
                        </NavLink>
                    </div>
                )}

                {isAdmin && (
                    <div className="nav-profile-updateUser nav-profile-link-container">
                        <NavLink className="link-text" to="/profile/addProduct">
                            <p className="nav-profile-title"><span className="material-symbols-outlined nav-profile-icon">
                            add_box
                            </span>Añadir producto</p>
                        </NavLink>
                    </div>
                )}

                {isAdmin && (
                    <div className="nav-profile-updateUser nav-profile-link-container">
                        <NavLink className="link-text" to="/profile/adminUser">
                            <p className="nav-profile-title"><span className="material-symbols-outlined nav-profile-icon">
                            admin_panel_settings
                            </span>Administrar users</p>
                        </NavLink>
                    </div>
                )}               

                <div className="nav-profile-updateUser nav-profile-link-container">
                    <NavLink className="link-text" to="/profile/deleteUser">
                        <p className="nav-profile-title"><span className="material-symbols-outlined nav-profile-icon">
                        delete
                        </span>Borrar cuenta</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}