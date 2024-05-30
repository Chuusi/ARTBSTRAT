import "./Product.css"
import { Link } from "react-router-dom"
import { getProductByName } from "../services/product.service"
import { useEffect, useState } from "react";
import { useProductError } from "../hooks/useProductError"
import { addBasket } from "../services/user.service";
import { useAddBasketError } from "../hooks";


export const Product = ({name}) => {
    const [product, setProduct] = useState({});
    const [ res, setRes] = useState({});
    const [ resBasket, setResBasket ] = useState({})

    const getProductInfo = async() => {
        setRes(await getProductByName(name))
    }

    useEffect(() => {
        getProductInfo();
    }, [name])
    
    useEffect(() => {
        if(res && Object.keys(res).length > 0){
            useProductError(res, setRes, setProduct)
        }
    }, [res]); 

    const handleBasket = async() => {
        const formData = {
            product: product?.data?._id
        }
        setResBasket(await addBasket(formData))
    }

    useEffect(() => {
        if(resBasket && Object.keys(resBasket).length > 0)
        useAddBasketError(resBasket, setResBasket);
    },[resBasket])

    return (
        <div className="product-page-container">
            <div className="product-link">
                <Link className="product-link-a" to="/"><p>Home</p></Link>
                <p>|</p>
                <Link className="product-link-a" to="/shop"><p> Tienda Artbstrat </p></Link>
                <p>|</p>
                <h3>{name}</h3>
            </div>

            <div className="product-page-card">
                <img src={product?.data?.image} alt={name} />
                <div className="product-info">
                    <h3 className="product-page-title">{name}</h3>
                    
                    {product?.data?.offerPrice 
                    ?   <div className="product-prices">
                            <p className="product-old-price">€{product?.data?.price} </p>
                            <p className="product-divisor">/</p>
                            <p className="product-offer">€{product?.data?.offerPrice} </p>
                            
                        </div>
                    :   <p className="product-normalPrice">€{product?.data?.price} </p>
                    }
                    
                    {product?.data?.stock==0 
                        ? <h2>AGOTADO</h2>
                        : null
                    }

                    {product?.data?.stock==0 
                        ? null
                        : <button className="product-page-button" onClick={handleBasket}>AGREGAR AL CARRITO</button>
                    }
                    
                    
                </div>
            </div>

            <div className="product-infoExtra">
                <div className="product-infoExtra-section">
                    <div className="product-infoExpres-div">
                        <span className="material-symbols-outlined">description</span>
                        <h4>Descripción del producto</h4>
                    </div>
                    <p>{product?.data?.description}</p>
                </div>

                <div className="product-infoExtra-section">
                    <div className="product-infoExpres-div">
                        <span className="material-symbols-outlined">compress</span>
                        <h4>Medidas</h4>
                    </div>
                    <p>{product?.data?.dimensions}</p>
                </div>

                <div className="product-infoExtra-section">
                    <div className="product-infoExpres-div">
                        <span className="material-symbols-outlined">info</span>
                        <h4>Composición y cuidado</h4>
                    </div>
                    <p>{product?.data?.composition}</p>
                </div>

                <div className="product-infoExtra-section">
                    <div className="product-infoExpres-div">
                        <span className="material-symbols-outlined">local_shipping</span>
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