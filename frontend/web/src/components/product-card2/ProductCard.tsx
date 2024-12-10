import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import styles from "./product-card.module.css";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface ProductCardProps {
    product: Product;
    addToCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
    return (
        <motion.div
            className={styles.productCard}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
        >
            <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                loading="lazy"
            />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <motion.button
                className={styles.addToCartButton}
                onClick={() => addToCart(product.id)}
                whileHover={{ scale: 1.05, backgroundColor: "#00ACC1" }}
                whileTap={{ scale: 0.95 }}
            >
                <ShoppingBag className={styles.icon} />
                Add to Cart
            </motion.button>
        </motion.div>
    );
};

export default ProductCard;
