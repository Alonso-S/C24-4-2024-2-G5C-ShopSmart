import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import styles from "./checkout-button.module.css";

interface CheckoutButtonProps {
    total: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ total }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.checkoutButton}
            onClick={() => alert("Proceeding to checkout...")}
        >
            <ShoppingBag size={20} />
            <span>Checkout ${total.toFixed(2)}</span>
        </motion.button>
    );
};

export default CheckoutButton;
