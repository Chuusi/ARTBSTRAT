import "./Gallery.css"
import { getAllPost } from "../services/post.service"
import { PostCard } from "../components/PostCard";

const postList = await getAllPost();

export const Gallery = () => {

    return (
        <div className="gallery-page">
            <h2 className="gallery-h2">GALERÍA ARTBSTRAT</h2>
            
            <div className="gallery-container-gallery">
            {postList.data.map((post) => 
                    <PostCard
                    key={post._id}
                    id={post._id}
                    image={post.image}
                    />
                )}

            </div>
        </div>
    )
}