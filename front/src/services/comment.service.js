import { updateToken } from "../utils";
import { APIuser } from "./serviceApiUser.js";


//?--------------------------------- GET COMMENT BY ID ----------------------------------------------
export const getCommentById = async (formData, id) => {
    return APIuser.get("/comment/byid", formData) 
        .then((res) => res)
        .catch((error) => error);
};


//?----------------------------------- CREATE COMMENT -----------------------------------------------
export const createComment = async (formData) => {
    return APIuser.post("/comment/createComment", formData, { 
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