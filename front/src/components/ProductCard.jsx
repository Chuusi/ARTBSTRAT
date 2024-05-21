import "./ProductCard.css"
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { addFavProduct, getLogedUser } from "../services/user.service"
import { useForm } from "react-hook-form";

//Primero nos traemos la informacion del usuario actualmente logeado
let currentUser = await getLogedUser()


export const ProductCard = ({id, name, image, price, offerPrice}) => {

    const [send, setSend] = useState(false);
    const [res, setRes] = useState({});
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();

    //Estado para cambiar el icono de favorito a no favorito
    const [ buttonFav, setButtonFav ] = useState(currentUser?.data?.favProducts?.includes(id) ? "heart_check" : "heart_plus")
    //Estado para cambiar el color del boton de favorito 
    const [ likeButtom, setLikeButtom ] = useState(currentUser?.data?.favProducts?.includes(id) ? "like" : "nolike")
    

    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await addFavProduct(formData));
        setSend(false);
    };

    useEffect(() => {
        console.log(res);          
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
                            currentUser.data.favProducts = currentUser.data.favProducts.filter((el) => el!=id);
                        }else{
                            setButtonFav("heart_check")
                            setLikeButtom("like")
                            currentUser.data.favProducts.push(id)
                        }
                    }}
                    type="submit"
                    name={id}
                    id={id}
                    value={id}
                    {...register("product")}
                    className={`shop-product-favorite shop-fav-button material-symbols-outlined ${likeButtom}`}>{buttonFav}</button> 
                : null}
            
                <Link to="/product" className="shop-Link"><img className="shop-product-img" src={image} alt={name}/></Link>
                <p className="shop-gallery-h3">{name}</p>
                <div className="shop-product-price">
                    <h3 className="shop-gallery-h3" style={{textDecoration: offerPrice ? "line-through" : "none"}}>{price} €</h3>
                    <h3 id="shop-offerPrice" className="shop-gallery-h3" style={{display: offerPrice ? "flex" : "none"}}>{offerPrice} €</h3>
                </div>
            </div>
        </form>
    )
}