import { updateToken } from "../utils";
import { APIuser } from "./service.ApiUser.js";


//?----------------------------------- GET ALL POST ---------------------------------------------
export const getAllPost = async (formData) => {
    return APIuser.get("/post/allPost", formData)
        .then((res) => res)
        .catch((error) => error);
};


//?--------------------------------- GET POST BY ID ----------------------------------------------
export const getPostById = async (formData, id) => {
    return APIuser.get(`/post/${id}`, formData) 
        .then((res) => res)
        .catch((error) => error);
};


//?----------------------------------- CREATE POST -----------------------------------------------
export const createPost = async (formData) => {
    return APIuser.post("/post/addPost", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, 
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- UPDATE POST -----------------------------------------------
export const updatePost = async (formData) => {
    return APIuser.patch("/post/update", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, 
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- DELETE POST -----------------------------------------------
export const deletePost = async (formData) => {
    return APIuser.delete("/post/delete", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`,
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};