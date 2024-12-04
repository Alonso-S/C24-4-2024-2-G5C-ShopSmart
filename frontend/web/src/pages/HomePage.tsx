import { Link } from "react-router-dom"; // Usamos Link para navegar sin recargar la página

export const HomePage = () => {
    return (
        <div>
            <h1>Bienvenido a ShopSmart</h1>
            <p>Una plataforma de optimización de compras</p>
            <Link to="/login">Ir a Login</Link>
            {" "}
        </div>
    );
};
