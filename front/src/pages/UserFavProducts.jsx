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
    const [res, setRes] = useState([]);
    const [favList, setFavList] = useState([]);


    const favListCreator = async() => {
        try {
            const promises = currentUser?.data?.favProducts.map(async product  => {
                const customFormData = {
                    refer: product
                }       
                return getProductByIdNoParam(customFormData);
            });

            const results = await Promise.all(promises);
            setRes(results);
        } catch (error) {
            console.log("Error del try/catch", error);
        }
        
    }

    useEffect(() => {
        if(res && res.length > 0){
            const updatedFavList = [];
            res.forEach(result => {
                useGetProductByIdNoParamError(result, setRes, setFavList, updatedFavList);
            })
            console.log("updated",updatedFavList);
            setFavList([...updatedFavList]);
        }
    },[res])


    useEffect(() => {
        favListCreator();
    },[])
    
    console.log("favList", favList);      

    return (
        <div className="profile-subcontainer">
            <div className="profile-favoriteList">
                <h3>PRODUCTOS FAVORITOS</h3>
                {favList.map((product) => 
                
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
