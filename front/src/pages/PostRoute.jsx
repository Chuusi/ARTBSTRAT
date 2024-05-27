import { useParams } from "react-router-dom";
import { Post } from "./Post";

export const PostRoute = () => {
    const { id } = useParams();

    return <Post id = {id}/>
}