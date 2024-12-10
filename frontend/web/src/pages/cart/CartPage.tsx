import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import ProductCard from "../../components/cards/product-card-cart/ProductCardCart";
import CartSummary from "../../components/cart-summary/CartSummary";
import EmptyCartButton from "../../components/buttons/empty-cart-button/EmptyCartButton";
import CheckoutButton from "../../components/buttons/checkout-button/CheckoutButton";
import Toast from "../../components/toast/Toast";
import styles from "./cart-page.module.css";
import Footer from "../../components/footer/Footer";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const initialProducts: Product[] = [
    {
        id: "1",
        name: "Smartphone",
        price: 599.99,
        image: "/placeholder.svg?height=100&width=100",
        quantity: 1,
    },
    {
        id: "2",
        name: "Laptop",
        price: 999.99,
        image: "/placeholder.svg?height=100&width=100",
        quantity: 1,
    },
    {
        id: "3",
        name: "Headphones",
        price: 149.99,
        image: "/placeholder.svg?height=100&width=100",
        quantity: 1,
    },
];

const CartPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const updateQuantity = (id: string, newQuantity: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id
                    ? { ...product, quantity: Math.max(0, newQuantity) }
                    : product
            )
        );
        showToastMessage("Quantity updated");
    };

    const removeProduct = (id: string) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
        showToastMessage("Product removed from cart");
    };

    const emptyCart = () => {
        setProducts([]);
        showToastMessage("Cart emptied");
    };

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const subtotal = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
    );
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;

    return (
        <>
            <main className={styles.cartContainer}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.cartTitle}
                >
                    <ShoppingCart className={styles.cartIcon} /> Your Cart
                </motion.h1>
                <div className={styles.cartContent}>
                    <div className={styles.productList}>
                        <AnimatePresence>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    updateQuantity={updateQuantity}
                                    removeProduct={removeProduct}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className={styles.cartSummary}>
                        <CartSummary
                            subtotal={subtotal}
                            tax={tax}
                            total={total}
                        />
                        <CheckoutButton total={total} />
                        <EmptyCartButton onEmptyCart={emptyCart} />
                    </div>
                </div>
                <Toast message={toastMessage} show={showToast} />
            </main>
            <Footer />
        </>
    );
};

export { CartPage };