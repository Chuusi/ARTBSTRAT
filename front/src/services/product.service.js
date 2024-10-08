import { updateToken } from "../utils";
import { APIuser } from "./service.ApiUser.js";


//?----------------------------------- GET ALL PRODUCTS ---------------------------------------------
export const getAllProducts = async (formData) => {
    return APIuser.get("/product/allProducts", formData)
        .then((res) => res)
        .catch((error) => error);
};



//?-------------------------------- GET PRODUCT BY NAME ---------------------------------------------
export const getProductByName = async (name) => {
    return APIuser.get(`/product/byName/${name}`) 
        .then((res) => res)
        .catch((error) => error);
};



//?--------------------------------- GET PRODUCT BY ID ----------------------------------------------
export const getProductById = async (formData, id) => {
    return APIuser.get(`/product/byid/${id}`, {
        params: formData
    })
        .then((res) => res)
        .catch((error) => error);
};

//?--------------------------------- GET PRODUCT BY ID NO PARAM--------------------------------------
export const getProductByIdNoParam = async (formData) => {
    return APIuser.get("/product/getbyidnoparam", {
        params: formData
    })
        .then((res) => res)
        .catch((error) => error);
};


//?----------------------------------- CREATE PRODUCT -----------------------------------------------
export const createProduct = async (formData) => {
    console.log(formData);
    return APIuser.post("/product/addProduct", formData, {
        headers: {
            Authorzation: `Bearer ${updateToken()}`,
            "Content-Type ": "multipart/form-data",
        },
    })
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- UPDATE PRODUCT -----------------------------------------------
export const updateProduct = async (formData) => {
    return APIuser.patch("/product/update", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, 
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- DELETE PRODUCT -----------------------------------------------
export const deleteProduct = async (formData) => {
    return APIuser.delete("/product/delete", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, //! --> si usamos AuthAdmin tambien se puede llamar con el token??
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};

