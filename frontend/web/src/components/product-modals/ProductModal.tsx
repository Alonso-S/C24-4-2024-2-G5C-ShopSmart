import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import styles from "./product-modal.module.css";
import { Product } from "../../types/Product";

interface ProductModalProps {
    product: Product | null;
    onSave: (product: Product) => void;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = (
    { product, onSave, onClose },
) => {
    const [formData, setFormData] = useState<Product>({
        id: "",
        name: "",
        category: "",
        quantity: 1,
        price: 0,
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" || name === "price"
                ? parseFloat(value)
                : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            id: formData.id || Date.now().toString(),
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
        >
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                className={styles.modalContent}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={20} />
                </button>
                <h2>{product ? "Edit Product" : "Add Product"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {product ? "Update" : "Add"} Product
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;
