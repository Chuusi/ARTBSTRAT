import "./Home.css"
import { NavLink } from "react-router-dom";

export const Home = () => {
    return (
        <div className="home-page">
            <div className="home-banner">
                <video className="home-banner-video" src="../../public/bannerBeach.mp4" autoPlay loop muted/>
                <img className="home-banner-logo" src="https://res.cloudinary.com/da7unrk9q/image/upload/v1715626802/artbstrat-removebg-preview_g67rwb.png" alt="logoArtbstrat" />
            </div>

            <div className="home-buttoms">
                <div className="home-buttom-shop">
                    <div className="home-div-img">
                        <NavLink className="home-navLink" to="/shop">
                            <img id="home-img" className="home-img" src="https://res.cloudinary.com/da7unrk9q/image/upload/v1715710145/1715708758870_xgohov.jpg" alt="" />   
                            <h3 className="home-h3">TIENDA</h3>
                        </NavLink>
                    </div>
                    
                </div>
                <div className="home-buttom-gallery">
                    <div className="home-div-img">
                        <NavLink className="home-navLink" to="/gallery">    
                            <img className="home-img" src="https://res.cloudinary.com/da7unrk9q/image/upload/v1715709200/1715708758953_enefki.jpg" alt="" />                           
                            <h3 className="home-h3">GALERÍA</h3>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="home-aleatories-comments">
                <h3>NUESTRA COMUNIDAD</h3>
                <div className="home-user-comments">
                    <p>Comentario random de un usuario diciendo lo bonito que le parece todo</p>
                    <img src="" alt="imagen de usuario" />
                </div>
            </div>
        </div>
    )
}