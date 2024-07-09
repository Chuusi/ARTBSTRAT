import { useEffect, useState } from "react";
import { useAuth } from "../context"
import { getLogedUser } from "../services/user.service";
import "./NavBar.css"
import {NavLink} from "react-router-dom"
import { useGetLogedUserError } from "../hooks";

export const NavBar = () => {
    
    const {user, logout} = useAuth();
    const [ userBasket, setUserBasket ] = useState({})
    const [ res, setRes ] = useState({});
    const [ basketUnits, setBasketUnits ] = useState(0)

    const userInfo = async() => setRes(await getLogedUser());

    

    useEffect(() => {
        userInfo();
    },[user])

    useEffect(() => {
        if(res && Object.keys(res).length > 0){
            useGetLogedUserError(res, setRes, setUserBasket)
            setBasketUnits(userBasket.length)
        }    
    },[res]);





    return (
        <>
        <div className="navbar-icon-container">
            {user == null && (
                <>
                <span className="material-symbols-outlined header-icono"></span>
                <span className="material-symbols-outlined header-icono"></span>
                <span className="material-symbols-outlined header-icono"></span>
                <NavLink className="header-icono-navlink" to="/login">
                    <span className="material-symbols-outlined header-icono">login</span>
                </NavLink>
                </>                
                
            )}
            {user != null && (
                <NavLink className="header-icono-navlink" to="/profile">
                    <span className="material-symbols-outlined header-icono">person</span>
                </NavLink>
            )}
            {user != null && (
                <NavLink className="header-icono-navlink" to="/profile/userFavProducts">
                    <span className="material-symbols-outlined header-icono">favorite</span>
                </NavLink>
            )}
            {user != null && (
                <NavLink className="header-icono-navlink" to="/profile/basket">
                    <span 
                        className="material-symbols-outlined header-icono"
                    >
                        shopping_bag
                            <div 
                                className="basket-number-container"
                                id="basket-number-container"
                                >
                                    <p 
                                    id="basketUnits-basketLogo"
                                    style={{display: basketUnits == 0 ? "none" : "block"}}
                                    >
                                        {basketUnits == 0 ? "" : basketUnits}
                                    </p>
                            </div>
                    </span>
                

                </NavLink>
            )}
            {user != null && (
                <NavLink className="header-icono-navlink" onClick={() => logout()}>
                    <span className="material-symbols-outlined header-icono">logout</span>
                </NavLink>
            )}
        </div>
        
        </>
    )
}