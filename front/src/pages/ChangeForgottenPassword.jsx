import { useForm } from "react-hook-form";
import { useAuth } from "../context"
import "./ChangeForgottenPassword.css"
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { changeForgottenPassword } from "../services/user.service";
import { useChangeForgottenPasswordError } from "../hooks/useChangeForgottenPasswordError";

export const ChangeForgottenPassword = ({token}) => {
    
    const {setUser,login} = useAuth();
    const {handleSubmit, register} = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [changed, setChanged] = useState(false);


    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await changeForgottenPassword(token,formData));
        setSend(false);
    };

    useEffect(() => {
        useChangeForgottenPasswordError(res,setRes,setChanged);
    },[res]);

    if(changed){
        return <Navigate to="/profile"/>
    }

    return (
        <div>ChangeForgottenPassword
            <form onSubmit={handleSubmit(formSubmit)}>
                
            </form>
        </div>
    )
}