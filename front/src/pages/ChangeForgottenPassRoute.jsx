import { useParams } from "react-router-dom"
import { ChangeForgottenPassword } from "./ChangeForgottenPassword";

export const ChangeForgottenPassRoute = () => {
    const {token} = useParams();
    return <ChangeForgottenPassword token={token}/>
}