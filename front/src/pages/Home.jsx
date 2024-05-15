import "./Home.css"
import { NavLink } from "react-router-dom";
import { getAllComment } from "../services/comment.service";

const listComment = await getAllComment();
console.log(listComment.data);

let carruselPointer = 0;

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
                <h3 className="home-comunity-h3">NUESTRA COMUNIDAD</h3>

                {/**CARRUSEL DE COMENTARIOS*/}
                    <div className="home-carrusel">
                        <div id="contentItemsCarrusel" className="home-carrusel-content">
                            {listComment.data.map((comment, index) => {
                                return(
                                <div key={index} className="home-carrusel-page" id={index}>
                                    <div className="home-carrusel-comment">
                                    <img className="home-logo-comment" src="https://res.cloudinary.com/da7unrk9q/image/upload/v1715797954/logo_wqxsk8.jpg" alt="logoArtbstrat" />
                                        <div className="home-div-comment">
                                            <h3 className="home-username">{comment.ownerName}</h3>
                                            <p className="home-p-comment">{comment.content}</p>
                                        </div>
                                    </div>
                                    <div className="home-carrusel-direction">
                                        <button className ="home-carrusel-buttoms" onClick={() => carruselPointer+=1}><a href={`#${index-1}`}><span className="home-arrow material-symbols-outlined">keyboard_double_arrow_left</span></a></button>
                                        <button className ="home-carrusel-buttoms" onClick={() => carruselPointer-=1}><a href={`#${index+1}`}><span className="home-arrow material-symbols-outlined">keyboard_double_arrow_right</span></a></button>
                                    </div>
                                </div>)
                            })}
                        </div>

                        <div className="home-div-points">
                            {listComment.data.map((comment, index) => 
                                    <div>
                                        <span id={index} className="home-points material-symbols-outlined">radio_button_{carruselPointer==index ? "checked" : "unchecked"}</span>
                                    </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}