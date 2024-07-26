// COMPONENTE 4. Página de error, para renderizarse cuando el usuario introduzca una ruta que no está definida en el código de la web

import { Link } from "react-router-dom"; // Módulo requerido en todos los componentes que se pintan enlaces <Link>.
import './notFound.scss';

function NotFound() {
    return (
        <div>
            <h2>La página que buscas no existe</h2>
            <Link to="/" className="button">Volver al Inicio</Link>
            {/* Se suele pintar un enlace para redirigir al usuario a la home */}
        </div>
    )
}

export default NotFound