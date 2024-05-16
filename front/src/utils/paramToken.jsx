import { useParams } from "react-router-dom"

export const tokenForgotten = () => {
    const token = useParams();
    return token;
}