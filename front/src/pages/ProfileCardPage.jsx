import { useEffect } from "react";
import { ProfileCard } from "../components"
import { useAuth } from "../context"
import "./ProfileCardPage.css"

export const ProfileCardPage = () => {
    
    const {user} = useAuth();

    
    return (
        <div className="profile-subcontainer">
            <ProfileCard user={user}/>
        </div>
    )
}
