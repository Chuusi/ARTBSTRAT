import { Outlet } from "react-router-dom"
import "./Profile.css"
import { NavProfile } from "../components/NavProfile"

export const Profile = () => {
    return (
        <div className="profile-container">
            <NavProfile/>
            <Outlet/>
        </div>
    )
}