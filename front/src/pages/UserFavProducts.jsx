import "./UserFavProducts.css"
import { useState, useEffect } from "react"
import { getLogedUser } from "../services/user.service"
import { ProductCard } from "../components/ProductCard"
import { PostCard } from "../components/PostCard"
import { getProductByIdNoParam } from "../services/product.service"
import { useGetProductByIdNoParamError } from "../hooks/useGetProductByIdNoParamError"
import { getPostById } from "../services/post.service"
import { useGetPostByIdError } from "../hooks/useGetPostByIdError"
import { useGetLogedError } from "../hooks"


//? Almacenamos la info del user en un estado
//! ------> PREGUNTAR A BEA SI ES CORRECTO HACER LA LLAMADA DESDE FUERA DE LA FUNCION
//const currentUser =  await getLogedUser();


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
    const [resPost, setResPost] = useState([]);
    const [favPostList, setFavPostList] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    //? Esta función se llama una vez al abrir la página, setea las respuestas para obtener los datos
    //? tanto de los posts como de los products del back.
    const favListCreator = async() => {
        try {
            const promises = currentUser?.data?.favProducts?.map(async product  => {
                const customFormData = {
                    refer: product
                }       
                return getProductByIdNoParam(customFormData);
            });

            const promisesPost = currentUser?.data?.favPosts?.map(async post  => {
                const customFormPostData = {
                    refer: post
                }       

                return getPostById(customFormPostData, post);
            });
            const results = await Promise.all(promises);
            const resultsPost = await Promise.all(promisesPost);
            setRes(results);
            setResPost(resultsPost);
        } catch (error) {
            console.log("Error del try/catch", error);
        }
        
    }


    //? Toma las respuestas al hacer la lista y setea los estados de las listas de products y posts
    useEffect(() => {
        if(res && res.length > 0){
            const updatedFavList = [];
            res.forEach(result => {
                if(result?.response) return
                useGetProductByIdNoParamError(result, setRes, setFavList, updatedFavList);
            })
            setFavList([...updatedFavList]);
        }
    },[res])

    useEffect(() => {
        if(resPost && resPost.length > 0){
            const updatedPostList = [];
            resPost.forEach(resultPost => {
                if(resultPost?.response) return
                useGetPostByIdError(resultPost, setResPost, setFavPostList, updatedPostList);
            })
            setFavPostList([...updatedPostList]);
        }
    },[resPost])

    //? Según se abre, se actualiza la lista de favoritos para poder imprimirla
    useEffect(() => {
        const getLoged = async() => {
            setCurrentUser(await getLogedUser());
        }
        getLoged();
    },[])
    
    useEffect(() => {
        if(Object.keys(currentUser).length > 0){
            favListCreator();
        }
    },[currentUser])

    return (
        <div className="profile-subcontainer-favs">
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
                {favPostList.map((post) => 
                        <PostCard
                            key={post._id}
                            id={post._id}
                            name={post.name}
                            image={post.image}
                        />
                )}
            </div>
        </div>
    )
}
