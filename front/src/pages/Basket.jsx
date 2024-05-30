import "./Basket.css"
import { getLogedUser } from "../services/user.service"
import { useState, useEffect } from "react"
import { useGetLogedUserError } from "../hooks/useGetLogedUserError"
import { getProductByIdNoParam } from "../services/product.service"
import { useGetProductIdError } from "../hooks/useGetProductIdError"
import { Link } from "react-router-dom"


export const Basket = () => {
    const [ res, setRes ] = useState({});
    const [ basketUser, setBasketUser] = useState([]); //Lista IDs de productos
    const [ productsBasket, setProductsBasket] = useState([]); //Lista de promesas llamada a los produtos
    const [ productList, setProdcutList ] = useState([]); //Lista de productos
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ precioFinal, setPrecioFinal ] = useState(0)

    //Nos traemos la info del usuario
    const currentUser = async() => {
        setRes(await getLogedUser())
    }

    //Ahora que tenemos el usuario, recorremos la lista de productos en el carrito
    const getProducts = async () => {
        if (basketUser && basketUser.length > 0) {
                try {
                    const promises = basketUser.map(async (product) => {
                        const customFormData = {
                            refer:product
                        }
                    return await getProductByIdNoParam(customFormData);
                    });
                    const resultProduct = await Promise.all(promises);
                    setProductsBasket(resultProduct);
                } catch (error) {
                    console.log("Error al recorrer los productos de la cesta del usuario", error);
                }
            }
        };

    useEffect(() => {
            currentUser()
    },[])

    //Nos traemos la basket del usuario (lista de IDs de productos)
    useEffect(() => {
        if (res && Object.keys(res).length > 0) {
            useGetLogedUserError(res, setRes, setBasketUser)
        }    
    },[res])

    useEffect(() =>{
        console.log("cuantas veces entro?");
        if (basketUser.length > 0) {
            getProducts()
        }
    }, [ basketUser ]);

    //Traemos productos del usuario
    useEffect(() => {
        console.log("aqui llega la lista de procutBasket", productsBasket);
        if(productsBasket && productsBasket.length > 0){
            const productListUpdated = [];
            productsBasket.forEach(result => {
                useGetProductIdError(result, setProductsBasket, productListUpdated, totalPrice, setTotalPrice)
            })
            setProdcutList([...productListUpdated]);
            setPrecioFinal(totalPrice)
        }
    }, [productsBasket]);


    return (
        <div className="basket-container">
            <div className="basket-product">
                {productList.map((product, index) => (
                    <div className="basket-productInfo" key={index}>
                        <img src={product?.image} alt={product?.name} />
                        <Link to={`/product/${product?.name}`}><p>{product?.name}</p></Link>
                        <h3>€ {product?.price}</h3>
                    </div>
                ))}

                <div className="basket-totalPrice">
                    <h3>TOTAL: €{precioFinal}</h3>
                </div>
            </div>


        </div>
    )
}