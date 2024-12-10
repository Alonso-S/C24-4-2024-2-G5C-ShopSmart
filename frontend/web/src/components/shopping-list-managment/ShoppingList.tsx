import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart2, Edit, Plus, Trash2 } from "lucide-react";
import styles from "./shopping-list.module.css";
import { ShoppingList as ShoppingListType } from "../../types/ShoppingList";
import { Product } from "../../types/Product";

interface ShoppingListProps {
    list: ShoppingListType;
    onAddProduct: () => void;
    onEditProduct: (product: Product) => void;
    onRemoveProduct: (productId: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
    list,
    onAddProduct,
    onEditProduct,
    onRemoveProduct,
}) => {
    const totalCost = list.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
    );

    return (
        <div className={styles.shoppingList}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.addButton}
                onClick={onAddProduct}
            >
                <Plus size={20} /> Add Product
            </motion.button>
            <AnimatePresence>
                {list.products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={styles.productItem}
                    >
                        <div className={styles.productInfo}>
                            <h3>{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>
                                Total: ${(product.price * product.quantity)
                                    .toFixed(2)}
                            </p>
                        </div>
                        <div className={styles.productActions}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onEditProduct(product)}
                            >
                                <Edit size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemoveProduct(product.id)}
                            >
                                <Trash2 size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    /* Implement price comparison */
                                }}
                            >
                                <BarChart2 size={20} />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            <div className={styles.totalCost}>
                Total Cost: ${totalCost.toFixed(2)}
            </div>
        </div>
    );
};

export default ShoppingList;
