import "./Product.css"
import { Link } from "react-router-dom"

export const Product = (id, name, price, offerPrice, description, dimensions, composition) => {
    return (
        <div className="product-page-container">
            <div className="product-link">
                <Link className="product-link-a" to="/"><p>Home</p></Link>
                <p>|</p>
                <Link className="product-link-a" to="/shop"><p> Tienda Artbstrat </p></Link>
                <p>|</p>
                <h3>Nombre del producto</h3>
            </div>

            <div className="product-page-card">
                <img src="https://res.cloudinary.com/da7unrk9q/image/upload/v1715883151/ejercicioSeis/mpjfp6nbd2row44ptfuz.jpg" alt="bolsito" />
                <div className="product-info">
                    <h3 className="product-page-title">Nombre del producto</h3>
                    <h2>12.5€</h2>
                    <h2>offerPrice</h2>
                    <h2>AGOTADO</h2>
                    <button className="product-page-button">AGREGAR AL CARRITO</button>
                </div>
            </div>

            <div className="product-infoExtra">
                <div className="product-infoExtra-section">
                    <div className="product-infoExpres-div">
                        <span class="material-symbols-outlined">description</span>
                        <h4>Descripción del producto</h4>
                    </div>
                    <p>Bolso bonito para ponerse cuando quieras</p>
                </div>

                <div className="product-infoExtra-section">
                    <div className="product-infoExpres-div">
                        <span class="material-symbols-outlined">compress</span>
                        <h4>Medidas</h4>
                    </div>
                    <p>30x35cm</p>
                </div>

                <div className="product-infoExtra-section">
                    <div className="product-infoExpres-div">
                        <span class="material-symbols-outlined">info</span>
                        <h4>Composición y cuidado</h4>
                    </div>
                    <p>100% algodón</p>
                </div>

                <div className="product-infoExtra-section">
                    <div className="product-infoExpres-div">
                        <span class="material-symbols-outlined">local_shipping</span>
                        <h4>Envío y devoluciones</h4>
                    </div>
                    <p>ENVIOS: </p>
                    <p className="product-p-delivery">De 1 a 3 días laborables. Envío gratuito a partir de 50€</p>
                    <p>DEVOLUCIONES: </p>
                    <p>30 días naturales</p>
                </div>
            </div>
        </div>
    )
}