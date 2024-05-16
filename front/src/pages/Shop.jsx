import "./Shop.css"
import { ProductCard  } from "../components/ProductCard";
import { getAllProducts } from "../services/product.service";

const productList = await getAllProducts();

export const Shop = () => {

    return (
        <div className="shop-page">
            <h2>TIENDA ARTBSTRAT</h2>
            
            <div className="shop-container-gallery">
                {productList.data.map((product) => 
                    <ProductCard 
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        offerPrice={product.offerPrice}
                    />
                )}
            </div>
        </div>
    )
}