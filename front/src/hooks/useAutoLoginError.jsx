import { Navigate } from "react-router-dom";

export const useAutoLogin = async(allUser, loginUser) => {
    try {
        const {password, email} = allUser?.data.user;
        const customFormData = {
            email,
            password,
        }

        const sendData = await loginUser(JSON.stringify(customFormData));

        if(sendData?.status == 200){
            const {name,email,image,check} = sendData?.data?.user;
            const userCustom = {
                token: sendData.data.token,
                user: name,
                email,
                image,
                check,
                _id: sendData.data.user._id,
            };

            const userJSON = JSON.stringify(userCustom);
            loginUser(userJSON);
            return <Navigate to="/"/>
        } else {
            return <Navigate to="/login"/>
        }

    } catch (error) {
        console.log(error);
    }
}