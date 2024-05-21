import "./PostCard.css"
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { addFavPost, getLogedUser } from "../services/user.service"
import { useForm } from "react-hook-form";
import { useAddFavPostError } from "../hooks/useAddFavPostError"

//Primero nos traemos la informacion del usuario actualmente logeado
let currentUser = await getLogedUser()


export const PostCard = ({id, name, image}) => {

    const [send, setSend] = useState(false);
    const [res, setRes] = useState({});
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();

    //Estado para cambiar el icono de favorito a no favorito
    const [ buttonFav, setButtonFav ] = useState(currentUser?.data?.favPosts?.includes(id) ? "heart_check" : "heart_plus")
    //Estado para cambiar el color del boton de favorito 
    const [ likeButtom, setLikeButtom ] = useState(currentUser?.data?.favPosts?.includes(id) ? "like" : "nolike")
    

    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await addFavPost(formData));
        setSend(false);
    };

    useEffect(() => {
        useAddFavPostError(res, setRes)
    }, [res]);


    return(
        <form onSubmit={handleSubmit(formSubmit)} className="gallery-product-card-container" >
            <div key={id} className="gallery-product-card">
            {user ? 
                <button
                    onClick={()=>{
                        if(buttonFav == "heart_check"){
                            setButtonFav("heart_plus")
                            setLikeButtom("nolike")
                            currentUser.data.favPost = currentUser.data.favPosts.filter((el) => el!=id);
                        }else{
                            setButtonFav("heart_check")
                            setLikeButtom("like")
                            currentUser.data.favPosts.push(id)
                        }
                    }}
                    type="submit"
                    name={id}
                    id={id}
                    value={id}
                    {...register("post")}
                    className={`gallery-product-favorite gallery-fav-button material-symbols-outlined ${likeButtom}`}>{buttonFav}</button> 
                : null}
            
                <Link to="/post" className="gallery-Link"><img className="gallery-product-img" src={image} alt={name}/></Link>
            </div>
        </form>
    )
}