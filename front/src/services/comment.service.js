import { updateToken } from "../utils";
import { APIuser } from "./service.ApiUser.js";


//?--------------------------------- GET COMMENT BY ID ----------------------------------------------
export const getCommentById = async (formData) => {
    console.log("este es el formData", formData);
    return APIuser.get("/comment/byid", {
        params: formData
    }) 
        .then((res) => res)
        .catch((error) => error);
};


//?--------------------------------- GET ALL COMMENT  ----------------------------------------------
export const getAllComment = async () => {
    return APIuser.get("/comment/allComment") 
        .then((res) => res)
        .catch((error) => error);
};


//?----------------------------------- CREATE COMMENT -----------------------------------------------
export const createComment = async (formData, idPost) => {
    return APIuser.post(`/comment/createComment/${idPost}`, formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, 
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- UPDATE COMMENT -----------------------------------------------
export const updateComment = async (formData) => {
    return APIuser.patch("/comment/update", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, 
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- DELETE COMMENT -----------------------------------------------
export const deleteComment = async (formData) => {
    return APIuser.delete("/comment/delete", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`,
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};