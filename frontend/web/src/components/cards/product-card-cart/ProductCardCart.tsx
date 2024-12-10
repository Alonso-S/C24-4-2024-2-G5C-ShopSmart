import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import styles from "./product-card-cart.module.css";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface ProductCardProps {
    product: Product;
    updateQuantity: (id: string, newQuantity: number) => void;
    removeProduct: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = (
    { product, updateQuantity, removeProduct },
) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={styles.productCard}
        >
            <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
            />
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>
                    ${product.price.toFixed(2)}
                </p>
                <div className={styles.quantityControl}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)}
                        className={styles.quantityButton}
                    >
                        <Minus size={16} />
                    </motion.button>
                    <span className={styles.quantity}>{product.quantity}</span>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)}
                        className={styles.quantityButton}
                    >
                        <Plus size={16} />
                    </motion.button>
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeProduct(product.id)}
                className={styles.removeButton}
            >
                <Trash2 size={20} />
            </motion.button>
        </motion.div>
    );
};

export default ProductCard;
