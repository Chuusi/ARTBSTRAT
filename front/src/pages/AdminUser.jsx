import { useEffect, useState } from "react"
import "./AdminUser.css"
import { getUsersByName } from "../services/user.service";

export const AdminUser = () => {
    
    const [usersNames, setUsersNames] = useState([]);
    const [search, setSearch] = useState("");
    const [res,setRes] = useState({});

    const searchUsers = async(names) => {
        const customFormData = {
            name:names
        }
        setRes(await getUsersByName(customFormData));
    }

    useEffect(() => {
        console.log(res?.data);
        if(res && Object.keys(res).length > 0){
            console.log("RES", res);
            setUsersNames(res?.data);
        }
    },[res])

    useEffect(() => {
        if(search && search.length > 0){
            searchUsers(search)
        }
    },[search])

    useEffect(() => {
        searchUsers("");
    },[])

    const handleInputChange = (event) => {
        console.log("handle", event?.target);
        const value = event?.target?.value;
        setSearch(value);
        searchUsers(value)
    }

    return (
        <div className="profile-subcontainer">
            <div className="admin-input-container">
                <input 
                    type="text" 
                    className="user-search-input" 
                    onChange={handleInputChange}
                    value={search}
                />
            </div>
            <div className="results-container">
                {usersNames?.length > 0 && 
                        usersNames.map(user => (
                            <div className="every-user-container" key={user._id}>
                                <p>{user.name}</p>
                                <select name="role" id="role" defaultValue={user.role}>
                                    <option value="admin">Administrador</option>
                                    <option value="user">Usuario</option>
                                </select>
                                <select name="status" id="status" defaultValue={user.status}>
                                    <option value="ok">Normal</option>
                                    <option value="muted">Silenciado</option>
                                    <option value="block">Bloqueado</option>
                                </select>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
