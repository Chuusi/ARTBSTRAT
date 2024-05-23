import { Navigate } from "react-router-dom";
import { loginUser } from "../services/user.service";

export const useAutoLogin = async(allUser, loginUserAuth) => {
    
    try {
        const {password, email} = allUser?.data?.user;
        const customFormData = {
            email,
            password,
        }

        const customFormDataJSON = JSON.stringify(customFormData)
        const sendData = await loginUser(customFormDataJSON);

        if(sendData?.status == 200){

            const {name,email,image,check} = sendData?.data?.user;
            const userCustom = {
                token: sendData?.data?.token,
                user: name,
                email,
                image,
                check,
                _id: sendData.data.user._id,
            };

            const userJSON = JSON.stringify(userCustom);
            loginUserAuth(userJSON);
            return <Navigate to="/"/>
        } else {
            return <Navigate to="/login"/>
        };

    } catch (error) {
        console.log(error);
    }
}