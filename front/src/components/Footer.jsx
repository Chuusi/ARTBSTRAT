import { NavLink } from "react-router-dom";
import "./Footer.css"

export const Footer = () => {
    return (
        <footer>
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
                            <p><a href="mailto:artbstrat.shop@gmail.com">artbstrat.shop@gmail.com</a></p>
                        </div>
                    </div>
                </div>


                <div className="footer-div-social-media">
                    <div className="footer-div-insta"><a target="_blank" href="https://www.instagram.com/artbstrat/" className="footer-insta fa fa-instagram"></a></div>
                </div>

                <div className="footer-signature"><p className="footer-signature-p"> 2024 © Artbstrat SL</p></div>
            </div>
        </footer>
    )
}
