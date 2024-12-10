import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import styles from "./view-cart-button.module.css";

const ViewCartButton: React.FC = () => {
    return (
        <motion.button
            className={styles.viewCartButton}
            whileHover={{ scale: 1.05, backgroundColor: "#00ACC1" }}
            whileTap={{ scale: 0.95 }}
        >
            <ShoppingCart className={styles.icon} />
            View Cart
        </motion.button>
    );
};

export default ViewCartButton;
