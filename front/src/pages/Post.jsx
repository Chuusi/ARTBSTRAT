import "./Post.css"
import { getPostById } from "../services/post.service"
import { useState, useEffect, useRef} from "react"
import { usePostError } from "../hooks/usePostError"
import { Link } from "react-router-dom"
import { getCommentById } from "../services/comment.service"
import { useGetCommentError } from "../hooks/useGetCommentError"
import { createComment } from "../services/comment.service"
import { useForm } from "react-hook-form"
import { useAddCommentError } from "../hooks/useAddCommentError"
import { useAuth } from "../context"

//Importacion de iconos y emojis
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';


export const Post = ({id}) => {
    const [post, setPost]  = useState({});
    const [res, setRes] = useState({});
    const [resComments, setResComments] = useState([]);
    const [resAddComment, setResAddComment] = useState({});
    const [commentList, setCommentList] = useState([]);
    const [likes, setLikes] = useState(0);
    const { register, handleSubmit, setValue, watch } = useForm();
    const {user, setUser} = useAuth();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const buttonRef = useRef(); //Esto nos va a permitir capturar la posicion de un elemento

    //Primero nos traemos toda la informacion de los post
    const getPostInfo = async() => {
        const tester = {}
        setRes(await getPostById(tester, id))
    }

    //Ahora que tenemos el post almacenado en la variable "post", recorremos la lista de comentarios para traernos los comentarios de la DB
    const getComments = async() => {
        console.log("POST",post);
        try {
            setLikes(post?.data?.likes);
            const promises = post?.data?.comments.map(async(comment) => { 
                const customFormData = {
                    id : comment
                }
                return getCommentById(customFormData)
            })
            const resultComments = await Promise.all(promises);
            setResComments(resultComments)
        } catch (error) {
            console.log("Error al recorrer los comentarios del post", error);
        }
    }


    //Handlesubmit para el boton de enviar nuevo comentario
    const handleAddComment = async(formData) => {
        if (formData && Object.keys(formData).length > 0){
            setResAddComment(await createComment(formData, post?.data?._id));
        }
    }

    //Añadimos el icono al comentario que esta escribiendo el usuario
    const addEmoji = (emoji) => {
        const currentComment = watch('content') || '';
        setValue('content', currentComment + emoji.native);
        setShowEmojiPicker(false);
    };

    //Configuramos el boton en forma de corazon para los likes
    const [liked, setLiked] = useState(false);
    const toggleLike = () => {
        setLiked(!liked)
    };
        


    //Traemos la info del post al renderizar la pagina
    useEffect(() => {
        getPostInfo();
    }, [id]);

    //Controlamos los errores de traer la info del post 
    useEffect(() => {
        if (res && Object.keys(res).length > 0){
            usePostError(res, setRes, setPost)
        }
    }, [res]);

    //Traemos los comentarios asociados a este post
    useEffect(() => {
        if(post && Object.keys(post).length > 0){
            getComments();
        }
    }, [post]);

    //Controlamos los errores de traer los comentarios
    useEffect(() => {
        if(resComments && resComments.length > 0){
            const commentListUpdated = [];
            resComments.forEach(result => {
                useGetCommentError(result, setResComments, setCommentList, commentListUpdated)
            })
            setCommentList([...commentListUpdated]);
        }
    }, [resComments]);

    //Controlamos los errores de crear un nuevo comentario
    useEffect(() => {
        useAddCommentError(resAddComment, setResAddComment, setCommentList, commentList)
    }, [resAddComment]);



    return (
        <div className="post-page-container">
            <div className="post-link">
                <Link className="post-link-a" to="/"><p>Home</p></Link>
                <p>|</p>
                <Link className="post-link-a" to="/gallery"><p> Galeria Artbstrat </p></Link>
                <p>|</p>
                <h3>{post?.data?.title}</h3>
            </div>

            <div className="post-page-card">
                <img src={post?.data?.image} alt={post?.data?.title} />
                <div className="post-commentSection">
                    <div className="post-commentList"> 
                        {commentList.map((comment) => {
                            return(
                                <div key={comment._id} className="post-comment">
                                    <p className="post-comment-owner">{comment.ownerName}</p>
                                    <p>{comment.content}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="post-likes">
                        <button onClick={toggleLike} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <FontAwesomeIcon className="post-heart-button" icon={liked ? solidHeart : regularHeart} style={{ color: 'black' }} />
                        </button>
                        <p>{likes} likes </p>
                    </div>
                    
                    
                    {/**Si no hay un usuario logueado, no sale la ventana para escribir comentarios */
                    user ?   
                        <div className="post-commentSubmit"> 
                            <form onSubmit={handleSubmit(handleAddComment)}>
                                <textarea 
                                    name="newComment" 
                                    id="newComment" 
                                    placeholder="Escribe aquí tu comentario"
                                    {...register("content", {required : true})}></textarea>
                                <div className="post-buttons">
                                    <button 
                                        className="post-emoji-button" 
                                        type="button" 
                                        ref={buttonRef} 
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                            <span className="material-symbols-outlined">mood</span>
                                        </button>
                                        {/**Mostramos el selector de iconos y lo añadimos al comentario */
                                        showEmojiPicker && 
                                        <div style={{ 
                                            position: 'absolute', 
                                            zIndex: 1, 
                                            top: buttonRef.current.offsetTop - 450, 
                                            left: buttonRef.current.offsetLeft -300, }}>
                                            <Picker onEmojiSelect={addEmoji} />
                                        </div>}

                                    <button className="post-submit-button" type="submit">
                                        <span className="material-symbols-outlined">send</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                    : null
                    }
                </div>
            </div>
        </div>
    )
}