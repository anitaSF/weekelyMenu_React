import { useState } from "react";
import { getDataFromApi } from "../Services/api-user";
import { useNavigate } from "react-router-dom";

import logo from '../../images/logotipo-login.webp';

function Login({ setUserData }) {
    // Credenciales demo cargadas por defecto
    const INITIAL_STATE = {
        username: 'emilys',
        password: 'emilyspass',
    };

    const navigate = useNavigate();

    const [user, setUser] = useState(INITIAL_STATE);

    const handleInput = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    };

    const handleForm = (e) => {
        e.preventDefault();
        getDataFromApi(user).then((data) => {
            if (data.token) { // Asegúrate de que el token esté presente en la respuesta
                localStorage.setItem("authToken", data.token); // Almacena el token en localStorage
                setUserData(data);
                navigate('/weekelymenu'); // Navegar a la página protegida
            } else {
                console.error('Login failed: ', data); // Manejo de errores si la API no devuelve un token
            }
        }).catch(error => {
            console.error('Error during login: ', error); // Manejo de errores
        });
    };

    return (
        <main className="login">
            <div className="card-login">
                <img className="logo-img" src={logo} />
                <h4 className="txt-login">Crea tus propios menus y empieza la semana comiendo sano y rico</h4>
                <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '1rem', textAlign: 'center' }}>
                    💡 <strong>Acceso Demo:</strong> Credenciales precargadas. Haz clic en "Login".
                </p>
                <form action='' onSubmit={handleForm}>

                    <div>
                        <label htmlFor='username'>Nombre de usuario</label>
                        <input type="text" id='username' name='username' value={user.username} onChange={handleInput} />
                    </div>
                    <div>
                        <label htmlFor='password'>Contraseña</label>
                        <input type='password' name='password' id='password' value={user.password} onChange={handleInput} />
                    </div>
                    <button className="btn">Login</button>

                </form>
            </div>
        </main>
    );
}

export default Login;