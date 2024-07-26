import { Link, useNavigate } from "react-router-dom";
import logo from '../../images/logotipo-header.webp';

function Header({ setUserData, userData }) {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        setUserData(null);
        localStorage.removeItem('user');
        navigate('/');
    };


    return (
        <header className="header">
            <div className="nav-container">
                <Link className="logo" to="/weekelymenu"><img className="logo-img" src={logo} /></Link>
                <input className="side-menu" type="checkbox" id="side-menu" />
                <label className="hamb" htmlFor="side-menu"><span className="hamb-line"></span></label>
                <nav className="nav">
                    <div className="nav-container">
                        <ul className="menu m-left">
                            <li><Link to="/weekelymenu">Menu Semanal</Link></li>
                            <li><Link to="/mymeals">Mis Comidas</Link></li>
                            <li><Link to="/form">Nueva Comida</Link></li>
                        </ul>
                        <div className="menu m-right">
                            {userData && (
                                <button className="btn" onClick={handleLogout}>Logout</button>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header