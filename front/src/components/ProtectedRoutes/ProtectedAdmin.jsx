import {Navigate} from "react-router-dom"
import { useAuth } from "../../context"

export const ProtectedAdmin = ({children}) => {
    const {user} = useAuth();

    if(user == null || user.role !== "admin") {
        return <Navigate to="/login" />
    }
    return children;
}