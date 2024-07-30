import { NavLink } from "react-router-dom"
import "./Header.css"
import { NavBar } from "./NavBar"

export const Header = () => {
    

    window.onscroll = () => {
        let scrollValue = document.body.style.getPropertyValue("--scroll");
        const logoSub = document.getElementById("logo-subtitle")
        const logo = document.getElementById("header-logo")
        if(scrollValue > .1){
            logoSub.textContent = "ARBSTRAT"
            logo.style.width = "20%";
            logo.style.maxWidth= "60px"
        } else{
            logoSub.textContent = ""
            logo.style.width = "40%";
            logo.style.maxWidth= "80px"
        }
    }
    
    
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
                <img id="header-logo" className="header-logo" src="/logo_artbs.png" alt="logo_artbstrat" />
                <p id="logo-subtitle"></p>
            </div>
            <div className="header-icons-container">
                <NavBar/>
            </div>
        </header>
        </>
    )
}
