import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import styles from "./purchase-list.module.css";
import UserContext from "../../../context/user/UserContext";
import { getAllPurchases } from "../../../api/purchase";

// interface Purchase {
//     id: number;
//     productName: string;
//     quantity: number;
//     price: number;
//     totalSpent: number;
//     store: string;
//     purchaseDate: string;
//     image: string;
//     description: string;
//     discount: number;
//     category: string;
// }

// const purchases: Purchase[] = [
//     {
//         id: 1,
//         productName: "Wireless Headphones",
//         quantity: 1,
//         price: 129.99,
//         totalSpent: 129.99,
//         store: "ElectroMart",
//         purchaseDate: "2023-05-15",
//         image: "/placeholder.jpg",
//         description: "High-quality wireless headphones with noise cancellation",
//         discount: 0,
//         category: "Electronics",
//     },
//     {
//         id: 2,
//         productName: "Wireless Headphones",
//         quantity: 1,
//         price: 129.99,
//         totalSpent: 129.99,
//         store: "ElectroMart",
//         purchaseDate: "2023-05-15",
//         image: "/placeholder.jpg",
//         description: "High-quality wireless headphones with noise cancellation",
//         discount: 0,
//         category: "Electronics",
//     },
// ];

interface PurchaseListProps {
    searchTerm: string;
    filter: string;
}

const PurchaseList: React.FC<PurchaseListProps> = ({ searchTerm, filter }) => {
    const user = useContext(UserContext);
    const [purchases, setPurchases] = useState([{
        id: 0,
        productName: "",
        quantity: undefined,
        price: 0.00,
        totalSpent: 0.00,
        store: "",
        purchaseDate: "",
        image: "",
        description: "",
        discount: 0,
        category: "",
    }]);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpand = (id: string) => {
        setExpandedItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    useEffect(() => {
        if (user.id === undefined) return;
        const loadPurchases = async (userId: number) => {
            try {
                const data = await getAllPurchases(userId);
                setPurchases(data);
            } catch (error) {
                console.error("Error loading purchase lists:", error);
                throw new Error(
                    "Failed to load purchase lists. Please try again later.",
                );
            }
        };
        loadPurchases(user.id);
    }, [user.id]);

    const filteredPurchases = purchases.filter((purchase) =>
        purchase.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "all" ||
            purchase.category.toLowerCase() === filter.toLowerCase())
    );

    const handleDelete = (id: number) => {
        // Implement delete logic here
        console.log(`Deleting purchase with id: ${id}`);
    };

    return (
        <div className={styles.purchaseList}>
            <AnimatePresence>
                {filteredPurchases.map((purchase) => (
                    <motion.div
                        key={String(purchase.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={styles.purchaseItem}
                    >
                        <div className={styles.purchaseHeader}>
                            <h3 className={styles.productName}>
                                {purchase.productName}
                            </h3>
                            <button
                                className={styles.expandButton}
                                onClick={() =>
                                    toggleExpand(String(purchase.id))}
                                aria-label={expandedItems.includes(
                                        String(purchase.id),
                                    )
                                    ? "Collapse details"
                                    : "Expand details"}
                            >
                                {expandedItems.includes(String(purchase.id))
                                    ? <ChevronUp className={styles.icon} />
                                    : (
                                        <ChevronDown
                                            className={styles.icon}
                                        />
                                    )}
                            </button>
                        </div>
                        <div className={styles.purchaseInfo}>
                            <p>Quantity: {purchase.quantity}</p>
                            <p>Total: ${purchase.totalSpent.toFixed(2)}</p>
                            <p>Store: {purchase.store}</p>
                            <p>Date: {purchase.purchaseDate}</p>
                        </div>
                        <AnimatePresence>
                            {expandedItems.includes(String(purchase.id)) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={styles.expandedContent}
                                >
                                    <div className={styles.expandedInfo}>
                                        <img
                                            src={purchase.image}
                                            alt={purchase.productName}
                                            className={styles.productImage}
                                        />
                                        <div>
                                            <p
                                                className={styles
                                                    .description}
                                            >
                                                {purchase.description}
                                            </p>
                                            {purchase.discount > 0 && (
                                                <p
                                                    className={styles
                                                        .discount}
                                                >
                                                    Discount applied: ${purchase
                                                        .discount.toFixed(
                                                            2,
                                                        )}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className={styles.deleteButtonContainer}>
                            <button
                                onClick={() => handleDelete(purchase.id)}
                                className={styles.deleteButton}
                            >
                                <Trash2 className={styles.deleteIcon} />
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default PurchaseList;
