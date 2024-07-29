import "./Gallery.css"
import { getAllPost } from "../services/post.service"
import { PostCard } from "../components/PostCard";

const postList = await getAllPost();

export const Gallery = () => {

    return (
        <div className="gallery-page">
            <h2 className="gallery-h2">GALERÍA ARTBSTRAT</h2>
            
            <ul className="gallery-container-gallery">
            {postList.data.map((post) => 
                    <li key={post._id}>
                        <PostCard
                        id={post._id}
                        image={post.image}
                        />
                    </li>
                )}

            </ul>
        </div>
    )
}