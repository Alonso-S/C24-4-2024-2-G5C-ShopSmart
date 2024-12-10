import React from "react";
import { motion } from "framer-motion";
import styles from "./product-info.module.css";

interface ProductInfoProps {
    product: {
        name: string;
        price: number;
        description: string;
    };
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    product,
}) => {
    return (
        <div className={styles.productInfo}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.productName}
            >
                {product.name}
            </motion.h1>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={styles.priceRating}
            >
                <span className={styles.price}>
                    ${product.price?.toFixed(2)}
                </span>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={styles.description}
            >
                {product.description}
            </motion.p>
        </div>
    );
};

export default ProductInfo;
