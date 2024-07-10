import "./Basket.css"
import { deleteBasket, getLogedUser } from "../services/user.service"
import { useState, useEffect } from "react"
import { useGetLogedUserError } from "../hooks/useGetLogedUserError"
import { getProductByIdNoParam } from "../services/product.service"
import { useGetProductIdError } from "../hooks/useGetProductIdError"
import { Link } from "react-router-dom"
import { useDeleteBasketError } from "../hooks"
import { alertaSuccess, alertaError } from "../utils"


export const Basket = () => {
    const [ res, setRes ] = useState({});
    const [ basketUser, setBasketUser] = useState([]); //Lista IDs de productos
    const [ productsBasket, setProductsBasket] = useState([]); //Lista de promesas llamada a los produtos
    const [ productList, setProdcutList ] = useState([]); //Lista de productos
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ precioFinal, setPrecioFinal ] = useState(0)
    const [resDelete, setResDelete] = useState({});
    const [ deleting, setDeleting ] = useState(false);

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
        currentUser();
        alertaError("Probando en basket",1500);
    },[])

    //Nos traemos la basket del usuario (lista de IDs de productos)
    useEffect(() => {
        if (res && Object.keys(res).length > 0) {
            useGetLogedUserError(res, setRes, setBasketUser)
        }    
    },[res])

    useEffect(() =>{
        if (basketUser.length > 0) {
            getProducts()
        } else if(basketUser.length == 0){
            setProdcutList([]);
        }
    }, [ basketUser ]);

    //Traemos productos del usuario
    useEffect(() => {

        if(productsBasket && productsBasket.length > 0){

            const productListUpdated = [];
            let newTotalPrice = 0;
            productsBasket.forEach(result => {
                useGetProductIdError(result, setProductsBasket, productListUpdated)
            })
            productListUpdated.forEach(product => {
                newTotalPrice += product.offer ? product.offerPrice : product.price;
            })
            setProdcutList([...productListUpdated]);
            setPrecioFinal(newTotalPrice)

        }

    }, [productsBasket]);

    const handleDeleteBasket = async(product) => {
        try {
            const customFormData = {
                product: product,
            }

            setDeleting(true)
            setResDelete(await deleteBasket(customFormData))
            setDeleting(false)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(resDelete && Object.keys(resDelete).length > 0){
            useDeleteBasketError(resDelete, setResDelete, setBasketUser)
        }
    },[resDelete])

    return (
        <div className="basket-container">
            {productList.length == 0 ? <div className="empty-basket">La cesta está vacía</div> : 
            <div className="basket-product">
                {productList.map((product, index) => (
                    <div className="basket-productInfo" key={index}>
                        <img src={product?.image} alt={product?.name} />
                        <Link to={`/product/${product?.name}`}><p className="product-name-basket">{product?.name}</p></Link>
                            
                        {product?.offer ? <small className="product-old-price-basket">€{product?.price} </small> : <small></small>}
                        <h3>€{product?.offer ? product?.offerPrice : product?.price}</h3>
                        <button 
                            onClick={() => handleDeleteBasket(product?._id)} 
                            className="basket-delete-button">
                                <span 
                                    className="material-symbols-outlined basket-delete-button-icon">
                                        delete_forever
                                </span>
                        </button>
                    </div>
                ))}

                <div className="basket-totalPrice">
                    <h3>TOTAL: €{precioFinal}</h3>
                </div>
            </div>
            }

        </div>
    )
}