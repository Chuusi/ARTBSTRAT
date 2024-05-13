import { NavLink } from "react-router-dom";
import "./Footer.css"

export const Footer = () => {
    return (
        <footer>
            <div className="footer-logo-div"><img className="footer-logo" src="https://res.cloudinary.com/da7unrk9q/image/upload/v1715626802/artbstrat-removebg-preview_g67rwb.png" alt="logo" /></div>
            <div className="footer">
            
                <div className="footer-div-info">
                    
                    <div className="footer-aboutUs">
                        <h3 className="footer-h3">Sobre nosotros</h3>
                        <NavLink className="footer-link" to="/aboutUs">
                            <p className="footer-link">Proyecto Artbstrat</p>
                        </NavLink>
                    </div>

                    <div className="footer-termsAndConditions">
                        <h3 className="footer-h3">Información</h3>
                        <NavLink className="footer-link" to="/termsAndConditions">
                            <p className="footer-link">Términos y condiciones</p>
                        </NavLink>
                    </div>
                    
                    <div className="footer-help">
                        <h3 className="footer-h3">¿Necesitas ayuda?</h3>
                        <div className="footer-mail">
                            <p className="material-symbols-outlined">mail</p>
                            <p>artbstrat.shop@gmail.com</p>
                        </div>
                    </div>
                </div>


                <div className="footer-div-social-media">
                    <div className="footer-div-insta"><a href="https://www.instagram.com/artbstrat/" className="footer-insta fa fa-instagram"></a></div>
                    <div className="footer-signature">2024 © Artbstrat SL</div>
                </div>
            </div>
        </footer>
    )
}
