import { Link } from "react-router-dom";
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
