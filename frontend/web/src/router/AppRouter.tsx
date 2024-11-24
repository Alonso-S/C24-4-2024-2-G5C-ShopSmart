import { AuthPage, DashboardPage, HomePage } from "../pages";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Header from "../layouts/Header";

function AppRouter() {
    return (
        <>
            <Header />
            <Routes>
                {/* Rutas públicas */}
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="auth" element={<AuthPage />} />
                </Route>

                {/* Rutas Protegidas  */}

                <Route element={<PrivateRoute />}>
                    <Route path="recipes" element={<DashboardPage />} />
                    <Route path="routes" element={<DashboardPage />} />
                    <Route path="offers" element={<DashboardPage />} />
                    <Route path="inventory" element={<DashboardPage />} />
                    <Route path="history" element={<DashboardPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRouter;
