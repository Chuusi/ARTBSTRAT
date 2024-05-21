import {Navigate} from "react-router-dom"
import { useAuth } from "../../context"
import { getLogedUser } from "../../services/user.service";

const infoUser = await getLogedUser();

export const ProtectedAdmin = ({children}) => {
    const {user} = useAuth();

    const isAdmin = infoUser?.data?.role === "admin" ? true : false

    if(!isAdmin || user == null) {
        return <Navigate to="/login" />
    }
    return children;
}