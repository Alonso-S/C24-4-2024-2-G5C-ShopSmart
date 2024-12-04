import { AuthPage, DashboardPage } from "../pages";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Header from "../layouts/Header";

function AppRouter() {
    return (
        <>
            <Header />
            <Routes>
                {/* Rutas públicas */}

                <Route path="/login" element={<AuthPage />} />

                {/* Rutas Protegidas  */}

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="recipes" element={<DashboardPage />} />
                    <Route path="routes" element={<DashboardPage />} />
                    <Route path="offers" element={<DashboardPage />} />
                    <Route path="inventory" element={<DashboardPage />} />
                    <Route path="history" element={<DashboardPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default AppRouter;
