import { useEffect, useState } from "react"
import "./AdminUser.css"
import { adminUser, getUsersByName } from "../services/user.service";
import { useForm } from "react-hook-form";
import { useAdminUserError } from "../hooks";


export const AdminUser = () => {
    
    const [usersNames, setUsersNames] = useState([]);
    const [search, setSearch] = useState("");
    const [res,setRes] = useState({});
    const [resAdmin, setResAdmin] = useState({});
    const {register, handleSubmit} = useForm({});

    const searchUsers = async(names) => {
        const customFormData = {
            name:names
        }
        setRes(await getUsersByName(customFormData));
    }

    useEffect(() => {
        if(res && Object.keys(res).length > 0){
            setUsersNames(res?.data);
        }
        console.log(usersNames);

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

    const formSubmit = async(event) => {
        event.preventDefault();
        const formData = {
            email: event?.target?.email.value,
            role: event?.target?.role.value,
            status: event?.target?.status.value,
        }
        setResAdmin(await adminUser(formData));
        console.log(formData);
    }

    useEffect(() => {
        if(resAdmin && Object.keys(resAdmin).length > 0){
            useAdminUserError(resAdmin, setResAdmin)
        }
    },[resAdmin])

    return (
        <div className="admin-profile-subcontainer">
            <div className="admin-input-container">
                <p>Buscar usuario: </p>
                <input 
                    type="text" 
                    className="user-search-input"
                    placeholder="Buscar usuario"
                    onChange={handleInputChange}
                    value={search}
                />
            </div>
            <div className="results-container">
                {usersNames?.length > 0 && 
                        usersNames.map(user => (
                            <form 
                            className="every-user-container" 
                            key={user._id}
                            onSubmit={formSubmit}
                            >
                                <p>{user.name}</p>
                                <input type="text" name="email" id="adminEmail" defaultValue={user.email}/>
                                <select 
                                name="role" 
                                id="role" 
                                defaultValue={user.role}
                                >
                                    <option value="admin">Administrador</option>
                                    <option value="user">Usuario</option>
                                </select>
                                <select 
                                name="status" 
                                id="status" 
                                defaultValue={user.status}

                                >
                                    <option value="ok">Normal</option>
                                    <option value="muted">Silenciado</option>
                                    <option value="block">Bloqueado</option>
                                </select>
                                <button
                                    type="submit"
                                    className="adminUser-submit-button"
                                >
                                    <span className="material-symbols-outlined adminUser-submit-button-icon">
                                        manage_accounts
                                    </span>
                                </button>
                            </form>
                        ))
                }
            </div>
        </div>
    )
}
