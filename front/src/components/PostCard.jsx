import "./PostCard.css"
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { addFavPost, getLogedUser } from "../services/user.service"
import { useForm } from "react-hook-form";
import { useAddFavPostError } from "../hooks/useAddFavPostError"
import { useGetLogedError } from "../hooks";


export const PostCard = ({id, name, image}) => {

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
            setButtonFav(resUser?.favPosts?.includes(id) ? "heart_check" : "heart_plus")
            setLikeButtom(resUser?.favPosts?.includes(id) ? "like" : "nolike")
        }
    },[resUser])

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
                            resUser.favPost = resUser.favPosts.filter((el) => el!=id);
                        }else{
                            setButtonFav("heart_check")
                            setLikeButtom("like")
                            resUser.favPosts.push(id)
                        }
                    }}
                    type="submit"
                    name={id}
                    id={id}
                    value={id}
                    {...register("post")}
                    className={`gallery-product-favorite gallery-fav-button material-symbols-outlined ${likeButtom}`}>{buttonFav}</button> 
                : null}
            
                <Link to={`/post/${id}`} className="gallery-Link"><img className="gallery-post-img" src={image} alt={name}/></Link>
            </div>
        </form>
    )
}