import "./Gallery.css"
import { getAllPost } from "../services/post.service"
import { PostCard } from "../components/PostCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const postList = await getAllPost();

export const Gallery = () => {

    return (
        <div className="gallery-page">
            <h2 className="gallery-h2">GALERÍA ARTBSTRAT</h2>
            
            {/* <ul className="gallery-container-gallery">
            {postList.data.map((post) => 
                    <li key={post._id}>
                        <PostCard
                        id={post._id}
                        image={post.image}
                        />
                    </li>
                )}

            </ul> */}

            <ResponsiveMasonry
                columnsCountBreakPoints={{900:1, 1200:2, 1500:3}}
                className="gallery-container-gallery"
            >
                <Masonry gutter="16px">
                    {postList.data.map((post) => 
                    <div 
                        key={post._id}
                        className="every-post"
                    >
                        <PostCard
                        id={post._id}
                        image={post.image}
                        />
                    </div>
                )}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}