import { NavLink } from "react-router-dom"
import { useAuth } from "../context"
import "./Header.css"
import { NavBar } from "./NavBar"

export const Header = () => {
    
    //const {user,logout} = useAuth();
    
    return (
        <>
        <header>
            <div className="header-ul-container">
                <ul>
                    <NavLink className="header-li-navlink" to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink className="header-li-navlink" to="/shop">
                        <li>Tienda</li>
                    </NavLink>
                    <NavLink className="header-li-navlink" to="/gallery">
                        <li>Galería</li>
                    </NavLink>
                    <NavLink className="header-li-navlink" to="/aboutUs">
                        <li>Sobre nosotros</li>
                    </NavLink>                    
                </ul>
            </div>
            <div className="header-logo-container">
                <img className="header-logo" src="/logo_artbs.png" alt="logo_artbstrat" />
            </div>
            <div className="header-icons-container">
                <NavBar/>
            </div>
        </header>
        </>
    )
}
