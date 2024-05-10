import { updateToken } from "../utils";
import { APIuser } from "./serviceApiUser.js";


//?----------------------------------- GET ALL PRODUCTS ---------------------------------------------
export const getAllProducts = async (formData) => {
    return APIuser.get("/product/allProducts", formData)
        .then((res) => res)
        .catch((error) => error);
};



//?-------------------------------- GET PRODUCT BY NAME ---------------------------------------------
export const getProductByName = async (formData) => {
    return APIuser.get("/product/byName", formData) //! --> como se pasan los parametros en la URL?? se añaden luego??
        .then((res) => res)
        .catch((error) => error);
};



//?--------------------------------- GET PRODUCT BY ID ----------------------------------------------
export const getProductById = async (formData) => {
    return APIuser.get("/product/byid", formData) //! --> como se pasan los parametros en la URL?? se añaden luego??
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- CREATE PRODUCT -----------------------------------------------
export const createProduct = async (formData) => {
    return APIuser.get("/product/addProduct", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, //! --> si usamos AuthAdmin tambien se puede llamar con el token??
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- UPDATE PRODUCT -----------------------------------------------
export const updateProduct = async (formData) => {
    return APIuser.get("/product/update", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, //! --> si usamos AuthAdmin tambien se puede llamar con el token??
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};



//?----------------------------------- DELETE PRODUCT -----------------------------------------------
export const deleteProduct = async (formData) => {
    return APIuser.get("/product/delete", formData, { 
        header: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`, //! --> si usamos AuthAdmin tambien se puede llamar con el token??
            },
        }) 
        .then((res) => res)
        .catch((error) => error);
};

