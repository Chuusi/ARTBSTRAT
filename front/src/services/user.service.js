import { updateToken } from "../utils";
import { tokenForgotten } from "../utils/paramToken";
import { APIuser } from "./service.ApiUser";

//? -------------------- REGISTER ------------------------

export const registerUser = async (formData) => {
    return APIuser.post("/user/registerUser", formData, {
        headers: { "Content-Type ": "multipart/form-data" },
    })
        .then( (res) => res )
        .catch( (error) => error );
}

//? ---------------------- LOGIN -------------------------

export const loginUser = async (formData) => {
    return APIuser.post("/user/login", formData)
        .then((res) => res)
        .catch((error) => error);
};

//? -------------- FORGOTTEN PASSWORD --------------------

export const forgottenPassword = async (formData) => {
    return APIuser.post("/user/forgottenPassword", formData)
        .then((res) => res)
        .catch((error) => error);
}

//? --------------- GET USER BY EMAIL --------------------

export const getUserByEmail = async (formData) => {
    return APIuser.get("/user/getUserByEmail", formData)
        .then((res) => res)
        .catch((error) => error);
}

//? ---------------- GET LOGED USER ----------------------

export const getLogedUser = async () => {
    return APIuser.get("/user/getLogedUser", {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//? --------------- RESEND CHECK CODE --------------------

export const resendCheckCode = async(formData) => {
    return APIuser.patch("/user/resendCheckCode", formData)
        .then((res) => res)
        .catch((error) => error);
}

//? ------------------ CHECK CODE ------------------------

export const checkUser = async (formData) => {
    return APIuser.patch("/user/checkUser", formData)
        .then((res) => res)
        .catch((error) => error);
};

//? --------------- CHANGE PASSWORD ----------------------

export const changePassword = async (formData) => {
    return APIuser.patch("/user/changePassword", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//? ---------- CHANGE FORGOTTEN PASSWORD -----------------

export const changeForgottenPassword = async (token, formData) => {
    return APIuser.patch(`/user/changeForgottenPassword/${token}`, formData)
        .then((res) => res)
        .catch((error) => error);
};

//? ----------------- UPDATE USER ------------------------

export const updateUser = async (formData) => {
    return APIuser.patch("/user/updateUser", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
            "Content-Type ": "multipart/form-data",
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//? --------------- ADD FAV PRODUCT ----------------------

export const addFavProduct = async (formData) => {
    return APIuser.patch("/user/addFavProduct", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
        
    })
        .then((res) => res)
        .catch((error) => error);
};

//? ----------------- ADD FAV POST -----------------------

export const addFavPost = async (formData) => {
    return APIuser.patch("/user/addFavPost", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//? ------------------ ADD BASKET ------------------------

export const addBasket = async (formData) => {
    return APIuser.patch("/user/addBasket", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//? ----------------- DELETE USER ------------------------

export const deleteUser = async () => {
    return APIuser.delete("/user/deleteUser", {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//? ------------------ ADMIN USER ------------------------

export const adminUser = async (formData) => {
    return APIuser.patch("/user/adminUser", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//? -------------- GET USER BY NAME-----------------------

export const getUsersByName = async (formData) => {
    return APIuser.get("/user/getUsersByName", {
        params: formData,
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//? --------------- DELETE BASKET -----------------------

export const deleteBasket = async (formData) => {
    return APIuser.patch("/user/removeBasket", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};