// import { DashboardPage, HomePage } from "../pages";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { StorePage } from "../pages/StorePage";
import ShoppingList from "../pages/ShoppingList";
import Recommendations from "../pages/Recommendations";
import Profile from "../pages/profile/ProfilePage";
import Inventory from "../pages/Inventory";
import { HomePage, LandingPage, LoginPage, RegisterPage } from "../pages";
import Header from "../components/header/Header";
import PriceComparison from "../pages/price-comparison/PriceComparisonPage";

function AppRouter() {
    return (
        <>
            <Header />
            <Routes>
                {/* Rutas públicas */}
                <Route path="/">
                    <Route index element={<LandingPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>

                {/* Rutas Protegidas  */}

                <Route element={<PrivateRoute />}>
                    <Route path="home" element={<HomePage />} />

                    <Route path="shopping-list" element={<ShoppingList />} />

                    <Route
                        path="recommendations"
                        element={<Recommendations />}
                    />

                    <Route path="profile" element={<Profile />} />
                    {/* ---------------------------------------------------- */}
                    <Route path="compare-prices" element={<PriceComparison />}>
                    </Route>
                    <Route path="routes" element={<LandingPage />} />

                    <Route path="stores" element={<StorePage />} />

                    <Route path="history" element={<LandingPage />} />
                    <Route path="inventory" element={<Inventory />}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default AppRouter;
