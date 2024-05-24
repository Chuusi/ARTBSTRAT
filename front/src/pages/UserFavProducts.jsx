import "./UserFavProducts.css"
import { useState, useEffect } from "react"
import { getLogedUser } from "../services/user.service"
import { ProductCard } from "../components/ProductCard"
import { PostCard } from "../components/PostCard"
import { getProductByIdNoParam } from "../services/product.service"
import { useGetProductByIdNoParamError } from "../hooks/useGetProductByIdNoParamError"


//? Almacenamos la info del user en un estado
//! ------> PREGUNTAR A BEA SI ES CORRECTO HACER LA LLAMADA DESDE FUERA DE LA FUNCION
const currentUser =  await getLogedUser();


/* const favListCreator = async() => {
    currentUser?.data?.favProducts.forEach(product => {
        customFormData = {
            id:product
        }
        productInfo = getProductByIdNoParam(customFormData);
        console.log("productInfo", productInfo);
        favList.push(productInfo)
    });
} */

/* favListCreator(); */



export const UserFavProducts = () => {
    const [res, setRes] = useState({});
    const [favList, setFavList] = useState([])



    const favListCreator = async() => {
        currentUser?.data?.favProducts.forEach(async product  => {
            const customFormData = {
                refer: product
            }
            console.log("promesa del back", await getProductByIdNoParam(customFormData));           
            setRes(await getProductByIdNoParam(customFormData));
        });
    }

    useEffect(() => {
        if(res && Object.keys(res).length > 0){
            console.log("ENTRO EN EL USEEFFECT RES")
            useGetProductByIdNoParamError(res, setRes, favList, setFavList);
            console.log("favlist", favList);
        }      
    },[res])


    useEffect(() => {
        favListCreator();
    },[])
    
    return (
        <div className="profile-subcontainer">
            <div className="profile-favoriteList">
                <h3>PRODUCTOS FAVORITOS</h3>
                {currentUser?.data?.favProducts.map((product) => 
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
                {currentUser?.data?.favPosts.map((product) => 
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
