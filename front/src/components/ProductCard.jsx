import "./ProductCard.css"
import { Link } from "react-router-dom";


export const ProductCard = ({id, name, image, price, offerPrice}) => {

    return(
        <Link className="shop-product-card-container" to="/product">
            <div key={id} className="shop-product-card">
                <span className="shop-product-favorite material-symbols-outlined">favorite</span>
                <img className="shop-product-img" src={image} alt={name} />
                <p className="shop-gallery-h3">{name}</p>
                <div className="shop-product-price">
                    <h3 className="shop-gallery-h3" style={{textDecoration: offerPrice ? "line-through" : "none"}}>{price} €</h3>
                    <h3 id="shop-offerPrice" className="shop-gallery-h3" style={{display: offerPrice ? "flex" : "none"}}>{offerPrice} €</h3>
                </div>
            </div>
        </Link>
    )
}