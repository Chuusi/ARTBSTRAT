import { Link, NavLink } from "react-router-dom"
import "./NavProfile.css"

export const NavProfile = () => {
    let active = true;
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