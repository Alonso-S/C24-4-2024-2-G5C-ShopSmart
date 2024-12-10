import React from "react";
import { motion } from "framer-motion";
import styles from "./recommended-products.module.css";
import ProductCard from "../product-card2/ProductCard";

const recommendedProducts = [
    {
        id: 2,
        name: "Wireless Earbuds",
        price: 79.99,
        image: "/placeholder.svg?height=100&width=100",
        description: "",
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 129.99,
        image: "/placeholder.svg?height=100&width=100",
        description: "",
    },
    {
        id: 4,
        name: "Noise-Cancelling Headphones",
        price: 249.99,
        image: "/placeholder.svg?height=100&width=100",
        description: "",
    },
];
const addToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
    // Implement cart functionality here
};
const RecommendedProducts: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.recommendedProducts}
        >
            <h2>Recommended Products</h2>
            <div className={styles.productGrid}>
                {recommendedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default RecommendedProducts;
