// import { DashboardPage, HomePage } from "../pages";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { StorePage } from "../pages/StorePage";
import ShoppingList from "../pages/ShoppingList";
import Recommendations from "../pages/recommendations/Recommendations";
import Profile from "../pages/profile/ProfilePage";
import Inventory from "../pages/Inventory";
import { HomePage, LandingPage, LoginPage, RegisterPage } from "../pages";
import Header from "../components/header/Header";
import PriceComparison from "../pages/price-comparison/PriceComparisonPage";
import { CartPage } from "../pages/cart/CartPage";
import ProductDetailPage from "../pages/product-detail/ProductDetailPage";
import NotificationPage from "../pages/notification/NotificationPage";
import PurchaseHistoryPage from "../pages/purchase-history/PurchaseHistoryPage";
import ShoppingListManagementPage from "../pages/shopping-list-managment/ShoppingListManagment";

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

                    <Route path="cart" element={<CartPage />} />

                    <Route path="products" element={<ProductDetailPage />} />

                    <Route
                        path="notifications"
                        element={<NotificationPage />}
                    />
                    <Route path="purchases" element={<PurchaseHistoryPage />} />

                    <Route
                        path="lists"
                        element={<ShoppingListManagementPage />}
                    >
                    </Route>
                    <Route
                        path="compare-prices"
                        element={<PriceComparison />}
                    />
                    <Route
                        path="recommendations"
                        element={<Recommendations />}
                    />
                    {/* ---------------------------------------------------- */}

                    <Route path="inventory" element={<Inventory />}></Route>
                    <Route path="stores" element={<StorePage />} />

                    {/* <Route path="routes" element={<LandingPage />} /> */}

                    <Route path="history" element={<LandingPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRouter;
