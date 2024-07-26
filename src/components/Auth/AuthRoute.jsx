import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDataUser } from "../Services/api-user";

function AuthRoute({ component }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            getDataUser(token)
                .then(data => {
                    if (data) {
                        setUserData(data);
                    } else {
                        setUserData(null); // Si la API no devuelve datos válidos
                    }
                })
                .catch(() => {
                    setUserData(null); // En caso de error de la API
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading...</div>;

    if (userData) {
        return component;
    } else {
        return <Navigate to="/" />
    }

}

export default AuthRoute;
