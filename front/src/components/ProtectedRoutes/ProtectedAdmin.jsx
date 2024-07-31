import {Navigate} from "react-router-dom"
import { useAuth } from "../../context"
import { getLogedUser } from "../../services/user.service";

const infoUser = await getLogedUser();

export const ProtectedAdmin = ({children}) => {

    const {user} = useAuth();


    console.log(infoUser);
    const isAdmin = infoUser?.data?.role === "admin" ? true : false

    if(!isAdmin || user == null) {
        return <Navigate to="/" />
    }
    return children;
}