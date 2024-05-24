import { Link } from "react-router-dom"
import "./NotFound.css"

export const NotFound = () => {
    return (
        <div className="notfound-container">
            <div className="notfound-logo-container">
                <img src="logo_artbs.png" alt="logo_artbstrat" />
                {/* <span class="material-symbols-outlined notfound-drop">
                water_drop
                </span> */}
            </div>
            
            <h2>Achooo, algo no ha ido bien...</h2>
            <Link to="/"><h3>Volver la página principal</h3></Link>
        </div>
    )
}