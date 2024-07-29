import "./ProductCard.css"
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { addFavProduct, getLogedUser } from "../services/user.service"
import { useForm } from "react-hook-form";
import { useAddFavProductError, useGetLogedError } from "../hooks";


export const ProductCard = ({id, name, image, price, offerPrice}) => {

    const [send, setSend] = useState(false);
    const [res, setRes] = useState({});
    const [resUser, setResUser] = useState({});
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();

    //Estado para cambiar el icono de favorito a no favorito
    const [ buttonFav, setButtonFav ] = useState("heart_plus")
    //Estado para cambiar el color del boton de favorito 
    const [ likeButtom, setLikeButtom ] = useState("nolike")
    

    const infoUser = async() => {
        setResUser(await getLogedUser())
    }

    useEffect(() => {
        infoUser();
    },[])

    useEffect(() => {
        if(resUser && Object.keys(resUser).length > 0){
            useGetLogedError(resUser, setResUser);
            setButtonFav(resUser?.favProducts?.includes(id) ? "heart_check" : "heart_plus")
            setLikeButtom(resUser?.favProducts?.includes(id) ? "like" : "nolike")
        }
    },[resUser])

    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await addFavProduct(formData));
        setSend(false);
    };

    useEffect(() => {
        useAddFavProductError(res, setRes)
    }, [res]);


    return(
        <form onSubmit={handleSubmit(formSubmit)} className="shop-product-card-container" to="/product">
            <div key={id} className="shop-product-card">
            {user ? 
                <button
                    onClick={()=>{
                        if(buttonFav == "heart_check"){
                            setButtonFav("heart_plus")
                            setLikeButtom("nolike")
                            resUser.favProducts = resUser.favProducts.filter((el) => el!=id);
                        }else{
                            setButtonFav("heart_check")
                            setLikeButtom("like")
                            resUser.favProducts.push(id)
                        }
                    }}
                    type="submit"
                    name={id}
                    id={id}
                    value={id}
                    {...register("product")}
                    className={`shop-product-favorite shop-fav-button material-symbols-outlined ${likeButtom}`}>{buttonFav}</button> 
                : null}
                <div className="img-container-shop">
                    <Link to={`/product/${name}`} className="shop-Link"><img className="shop-product-img" src={image} alt={name}/></Link>
                </div>
                <p className="shop-gallery-h3">{name}</p>
                <div className="shop-product-price">
                    <h3 className="shop-gallery-h3" style={{textDecoration: offerPrice ? "line-through" : "none"}}>{price} €</h3>
                    <h3 id="shop-offerPrice" className="shop-gallery-h3" style={{display: offerPrice ? "flex" : "none"}}>{offerPrice} €</h3>
                </div>
            </div>
        </form>
    )
}