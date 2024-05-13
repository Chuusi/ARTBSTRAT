import { useAuth } from "../context"
import "./NavBar.css"
import {NavLink} from "react-router-dom"

export const NavBar = () => {
    
    const {user} = useAuth();

    
    return (
        <>
        <div className="navbar-icon-container">
            {user == null && (
                <NavLink className="header-icono-navlink" to="/login">
                    <span className="material-symbols-outlined header-icono">login</span>
                </NavLink>
            )}
            {user == null && (
                <NavLink className="header-icono-navlink" to="/profile">
                    <span className="material-symbols-outlined header-icono">person</span>
                </NavLink>
            )}
            {user == null && (
                <NavLink className="header-icono-navlink" to="/profile/userFavProducts">
                    <span className="material-symbols-outlined header-icono">favorite</span>
                </NavLink>
            )}
            {user == null && (
                <NavLink className="header-icono-navlink" to="/profile/basket">
                    <span className="material-symbols-outlined header-icono">shopping_bag</span>
                </NavLink>
            )}
        </div>
        
        </>
    )
}