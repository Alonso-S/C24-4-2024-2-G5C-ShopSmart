import React from "react";
import { motion } from "framer-motion";
import styles from "./card-summary.module.css";

interface CartSummaryProps {
    subtotal: number;
    tax: number;
    total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, tax, total }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.cartSummary}
        >
            <h2 className={styles.summaryTitle}>Cart Summary</h2>
            <div className={styles.summaryItem}>
                <span>Subtotal:</span>
                <motion.span key={subtotal} animate={{ scale: [1, 1.1, 1] }}>
                    ${subtotal.toFixed(2)}
                </motion.span>
            </div>
            <div className={styles.summaryItem}>
                <span>Tax:</span>
                <motion.span key={tax} animate={{ scale: [1, 1.1, 1] }}>
                    ${tax.toFixed(2)}
                </motion.span>
            </div>
            <div className={`${styles.summaryItem} ${styles.total}`}>
                <span>Total:</span>
                <motion.span key={total} animate={{ scale: [1, 1.1, 1] }}>
                    ${total.toFixed(2)}
                </motion.span>
            </div>
        </motion.div>
    );
};

export default CartSummary;
