import "./Post.css"
import { getPostById } from "../services/post.service"
import { useState, useEffect } from "react"
import { usePostError } from "../hooks/usePostError"
import { Link } from "react-router-dom"
import { getCommentById } from "../services/comment.service"
import { useGetCommentError } from "../hooks/useGetCommentError"
import { createComment } from "../services/comment.service"
import { useForm } from "react-hook-form"
import { useAddCommentError } from "../hooks/useAddCommentError"

export const Post = ({id}) => {
    const [post, setPost]  = useState({});
    const [res, setRes] = useState({});
    const [resComments, setResComments] = useState([]);
    const [resAddComment, setResAddComment] = useState({});
    const [commentList, setCommentList] = useState([]);
    const { register, handleSubmit } = useForm();

    //Primero nos traemos toda la informacion de los post
    const getPostInfo = async() => {
        const tester = {}
        setRes(await getPostById(tester, id))
    }

    //Ahora que tenemos el post almacenado en la variable "post", recorremos la lista de comentarios para traernos los comentarios de la DB
    const getComments = async() => {
        try {
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



    //Hacemos uso de useEffect para controlar los errores
    useEffect(() => {
        getPostInfo();
    }, [id]);

    useEffect(() => {
        if (res && Object.keys(res).length > 0){
            usePostError(res, setRes, setPost)
        }
    }, [res]);

    useEffect(() => {
        if(post && Object.keys(post).length > 0){
            getComments();
        }
    }, [post]);

    useEffect(() => {
        if(resComments && resComments.length > 0){
            const commentListUpdated = [];
            resComments.forEach(result => {
                useGetCommentError(result, setResComments, setCommentList, commentListUpdated)
            })
            setCommentList([...commentListUpdated]);
        }
    }, [resComments]);

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
                                <div>
                                    <p>{comment.ownerName}</p>
                                    <p>{comment.content}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="post-likes"> ME GUSTAS </div>

                    <div className="post-commentSubmit"> 
                        <form onSubmit={handleSubmit(handleAddComment)}>
                            <textarea 
                                name="newComment" 
                                id="newComment" 
                                placeholder="Escribe aquí tu comentario"
                                {...register("content", {required : true})}></textarea>
                            <button type="submit">ENVIAR COMENTARIO</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}