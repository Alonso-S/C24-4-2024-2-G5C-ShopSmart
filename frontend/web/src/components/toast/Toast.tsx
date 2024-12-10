import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./toast.module.css";

interface ToastProps {
    message: string;
    show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className={styles.toast}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
