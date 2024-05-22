import "./UserFavProducts.css"
import { useState, useEffect } from "react"
import { getLogedUser } from "../services/user.service"
import { ProductCard } from "../components/ProductCard"
import { PostCard } from "../components/PostCard"


//? Almacenamos la info del user en un estado
//! ------> PREGUNTAR A BEA SI ES CORRECTO HACER LA LLAMADA DESDE FUERA DE LA FUNCION
const currentUser =  await getLogedUser()

export const UserFavProducts = () => {
    const [res, setRes] = useState({});
    console.log(currentUser);
    
    return (
        <div className="profile-subcontainer">
            <div className="profile-favoriteList">
                <h3>PRODUCTOS FAVORITOS</h3>
                {currentUser.data.favProducts.map((product) => 
                        <ProductCard 
                            key={product._id}
                            id={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            offerPrice={product.offerPrice}
                        />
                )}
            </div>
            <div className="profile-favoriteList">
                <h3>POST FAVORITOS</h3>
                {currentUser.data.favPosts.map((product) => 
                        <PostCard
                            key={product._id}
                            id={product._id}
                            image={product.image}
                        />
                )}
            </div>
        </div>
    )
}
