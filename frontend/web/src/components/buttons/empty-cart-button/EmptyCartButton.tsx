import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import styles from "./empty-cart-button.module.css";

interface EmptyCartButtonProps {
    onEmptyCart: () => void;
}

const EmptyCartButton: React.FC<EmptyCartButtonProps> = ({ onEmptyCart }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleEmptyCart = () => {
        setShowConfirmation(true);
    };

    const confirmEmptyCart = () => {
        onEmptyCart();
        setShowConfirmation(false);
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.emptyCartButton}
                onClick={handleEmptyCart}
            >
                <Trash2 size={20} />
                <span>Empty Cart</span>
            </motion.button>
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={styles.confirmationDialog}
                    >
                        <p>Are you sure you want to empty your cart?</p>
                        <div className={styles.confirmationButtons}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={confirmEmptyCart}
                            >
                                Yes
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowConfirmation(false)}
                            >
                                No
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EmptyCartButton;
