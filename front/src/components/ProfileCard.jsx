import "./ProfileCard.css"


export const ProfileCard = (user) => {
    //user con email, image, user(nombre)
    
    return (
        <div className="profile-card-container">
            <div className="image-name-container">
                <img src={user.user.image} alt="profile-image" className="profile-img" />
                <h4 className="profile-name">{user.user.user}</h4>
                <p className="profile-email">Correo: {user.user.email}</p>
            </div>
        </div>
    )
}
