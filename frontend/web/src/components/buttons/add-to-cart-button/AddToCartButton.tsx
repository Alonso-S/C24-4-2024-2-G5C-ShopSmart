import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import styles from "./add-to-cart-button.module.css";

interface AddToCartButtonProps {
    price: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ price }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.button
            className={styles.addToCartButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
        >
            <AnimatePresence mode="wait">
                {isAdded
                    ? (
                        <motion.div
                            key="added"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.addedContent}
                        >
                            <Check size={20} />
                            <span>Added to Cart</span>
                        </motion.div>
                    )
                    : (
                        <motion.div
                            key="add"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.addContent}
                        >
                            <ShoppingCart size={20} />
                            <span>Add to Cart - ${price?.toFixed(2)}</span>
                        </motion.div>
                    )}
            </AnimatePresence>
        </motion.button>
    );
};

export default AddToCartButton;
