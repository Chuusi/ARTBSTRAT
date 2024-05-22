import { useParams } from "react-router-dom";
import { Product } from "./Product";

export const ProductRoute = () => {
    const { name } = useParams();

    return <Product name = {name}/>
}
