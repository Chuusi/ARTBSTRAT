import { createContext, useContext, useMemo, useState } from "react";
import { getLogedUser } from "../services/user.service";
import { alertaSuccess } from "../utils";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    //* Estado del user que se inicia en función de lo que haya en el local storage
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    })

    //* AllUser almacena info cuando se haga el register
    const [ allUser, setAllUser ] = useState({
        data:{
            confirmationCode:"",
            user:{
                password:"",
                email:"",
            },
        },
    });

    //* Función puente para evitar problemas de asincronía
    const bridgeData = (state) => {
        const dataJSON = localStorage.getItem("data");
        const data = JSON.parse(dataJSON);
        switch (state) {
            case "ALLUSER":
                setAllUser(data);
                localStorage.removeItem("data");
                break;
            default:
                break;
        }
    }

    //* Al login se le pasa la data como un objeto JSON
    const login = (data) => {
        localStorage.setItem("user", data);
        const parseUser = JSON.parse(data);
        setUser(parseUser);
    };

    

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        alertaSuccess("Sesión cerrada", 2000);
    }

    //* useMemo para que escuche user y allUser y almacene el resto y que quede inmutable
    const value = useMemo(() => ({
        user,
        setUser,
        login,
        logout,
        allUser,
        setAllUser,
        bridgeData,
    }), [user, allUser]);

    //* Devolvemos el componente del contexto
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

//* Creamos y exportamos el customhook para el contexto
export const useAuth = () => useContext(AuthContext);