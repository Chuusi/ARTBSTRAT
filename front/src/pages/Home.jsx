import "./Home.css"
import { NavLink } from "react-router-dom";
import { getAllComment } from "../services/comment.service";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'; 
import Carousel from 'react-bootstrap/Carousel'; 

//Traemos todos los comentarios
const listComment = await getAllComment();

export const Home = () => {
    
    const [selected, setSelected] = useState([]);
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setSelected(listComment);
    },[listComment])


    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    const CustomPrevButton = ({index}) => {
        const prevIndex = (index === 0 ? 4 : index - 1);
        return (
            <div className="custom-control-prev-icon custom-control">
                <div className="home-carrusel-comment">
                    <img className="home-logo-comment" src={selected?.data?.results[prevIndex]?.image} alt="https://res.cloudinary.com/da7unrk9q/image/upload/v1715797954/logo_wqxsk8.jpg" />
                    <div className="home-div-comment">
                        <h3 className="home-username">{selected?.data?.results[prevIndex]?.comment?.ownerName}</h3>
                        <p className="home-p-comment">{selected?.data?.results[prevIndex]?.comment?.content}</p>
                    </div>
                </div>
            </div>
        )
    }

    const CustomNextButton = ({index}) => {
        const nextIndex = (index === 4 ? 0 : index + 1);
        return (
            <div className="custom-control-next-icon custom-control">
                <div className="home-carrusel-comment">
                    <img className="home-logo-comment" src={selected?.data?.results[nextIndex]?.image} alt="https://res.cloudinary.com/da7unrk9q/image/upload/v1715797954/logo_wqxsk8.jpg" />
                    <div className="home-div-comment">
                        <h3 className="home-username">{selected?.data?.results[nextIndex]?.comment?.ownerName}</h3>
                        <p className="home-p-comment">{selected?.data?.results[nextIndex]?.comment?.content}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="home-page">
            <div className="home-banner">
                <video className="home-banner-video" src="/bannerBeach.mp4" autoPlay loop muted/>
                <h1 className="home-banner-logo">ARTBSTRAT</h1>
                {/*<img className="home-banner-logo" src="https://res.cloudinary.com/da7unrk9q/image/upload/v1715626802/artbstrat-removebg-preview_g67rwb.png" alt="logoArtbstrat" />*/}
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

                {/**CARRUSEL DE COMENTARIOS CON BOOTSTRAP*/}
                <Carousel
                    className='my-carousel'
                    indicators={false}
                    pause='hover'
                    interval={3000}
                    onSelect={handleSelect}
                    activeIndex={index}
                    prevIcon={<CustomPrevButton index={index}></CustomPrevButton>}
                    nextIcon={<CustomNextButton index={index}></CustomNextButton>}
                    autoPlay
                    autoPlaySpeed={1}
                >
                    {selected?.data?.results.map((element, i) => (
                        <Carousel.Item
                            key={i}
                        >
                            <div className="home-carrusel-comment">
                                <img className="home-logo-comment" src={element?.image} alt="https://res.cloudinary.com/da7unrk9q/image/upload/v1715797954/logo_wqxsk8.jpg" />
                                <div className="home-div-comment">
                                    <h3 className="home-username">{element?.comment.ownerName}</h3>
                                    <p className="home-p-comment">{element?.comment.content}</p>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

//https://res.cloudinary.com/da7unrk9q/image/upload/v1715797954/logo_wqxsk8.jpg