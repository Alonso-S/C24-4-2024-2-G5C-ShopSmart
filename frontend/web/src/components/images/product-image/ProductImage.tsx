import React, { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import styles from "./product-image.module.css";

interface ProductImageProps {
    image: string;
    name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <div className={styles.imageContainer}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={styles.imageWrapper}
            >
                <img src={image} alt={name} className={styles.productImage} />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isZoomed ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.zoomOverlay}
                >
                    <ZoomIn size={24} />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ProductImage;
