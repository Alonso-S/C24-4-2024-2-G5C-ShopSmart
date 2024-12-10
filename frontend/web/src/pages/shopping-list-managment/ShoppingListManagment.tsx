import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    BarChart2,
    Bell,
    Edit,
    Plus,
    Save,
    Share2,
    Trash2,
} from "lucide-react";
import styles from "./shopping-list-managment.module.css";

import { Product } from "../../types/Product";
import { ShoppingList as ShoppingListType } from "../../types/ShoppingList";
import ProductModal from "../../components/product-modals/ProductModal";
import NotificationBar from "../../components/notification-bar/NotificationBar";
import ShoppingList from "../../components/shopping-list-managment/ShoppingList";

const ShoppingListManagementPage: React.FC = () => {
    const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([]);
    const [selectedList, setSelectedList] = useState<ShoppingListType | null>(
        null,
    );
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Fetch shopping lists from API or local storage
        const fetchedLists: ShoppingListType[] = [
            {
                id: "1",
                name: "Weekly Shopping",
                type: "Groceries",
                products: [],
            },
            { id: "2", name: "Special Offers", type: "Deals", products: [] },
        ];
        setShoppingLists(fetchedLists);
    }, []);

    const handleAddProduct = (product: Product) => {
        if (selectedList) {
            const updatedList = {
                ...selectedList,
                products: [...selectedList.products, product],
            };
            updateShoppingList(updatedList);
        }
    };

    const handleEditProduct = (product: Product) => {
        if (selectedList) {
            const updatedProducts = selectedList.products.map((p) =>
                p.id === product.id ? product : p
            );
            const updatedList = {
                ...selectedList,
                products: updatedProducts,
            };
            updateShoppingList(updatedList);
        }
    };

    const handleRemoveProduct = (productId: string) => {
        if (selectedList) {
            const updatedProducts = selectedList.products.filter((p) =>
                p.id !== productId
            );
            const updatedList = {
                ...selectedList,
                products: updatedProducts,
            };
            updateShoppingList(updatedList);
        }
    };

    const updateShoppingList = (updatedList: ShoppingListType) => {
        const updatedLists = shoppingLists.map((list) =>
            list.id === updatedList.id ? updatedList : list
        );
        setShoppingLists(updatedLists);
        setSelectedList(updatedList);
    };

    const handleSaveList = () => {
        // Implement save functionality
        console.log("Saving list:", selectedList);
    };

    const handleShareList = () => {
        // Implement share functionality
        console.log("Sharing list:", selectedList);
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Shopping List Management</h1>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h2>Your Lists</h2>
                    <ul className={styles.listCategories}>
                        {shoppingLists.map((list) => (
                            <motion.li
                                key={list.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedList(list)}
                                className={`${styles.listItem} ${
                                    selectedList?.id === list.id
                                        ? styles.selected
                                        : ""
                                }`}
                            >
                                {list.name}
                            </motion.li>
                        ))}
                    </ul>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.addListButton}
                        onClick={() => {
                            /* Implement add new list functionality */
                        }}
                    >
                        <Plus size={20} /> New List
                    </motion.button>
                </div>
                <div className={styles.mainContent}>
                    {selectedList && (
                        <>
                            <div className={styles.listHeader}>
                                <h2>{selectedList.name}</h2>
                                <div className={styles.listActions}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={styles.actionButton}
                                        onClick={handleSaveList}
                                    >
                                        <Save size={20} /> Save
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={styles.actionButton}
                                        onClick={handleShareList}
                                    >
                                        <Share2 size={20} /> Share
                                    </motion.button>
                                </div>
                            </div>
                            <ShoppingList
                                list={selectedList}
                                onAddProduct={() => {
                                    setEditingProduct(null);
                                    setIsProductModalOpen(true);
                                }}
                                onEditProduct={(product) => {
                                    setEditingProduct(product);
                                    setIsProductModalOpen(true);
                                }}
                                onRemoveProduct={handleRemoveProduct}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className={styles.quickLinks}>
                <a href="/history">Purchase History</a>
                <a href="/inventory">Inventory Management</a>
                <a href="/recommendations">Personalized Recommendations</a>
            </div>
            <AnimatePresence>
                {isProductModalOpen && (
                    <ProductModal
                        product={editingProduct}
                        onSave={(product) => {
                            if (editingProduct) {
                                handleEditProduct(product);
                            } else {
                                handleAddProduct(product);
                            }
                            setIsProductModalOpen(false);
                        }}
                        onClose={() => setIsProductModalOpen(false)}
                    />
                )}
            </AnimatePresence>
            <NotificationBar />
        </div>
    );
};

export default ShoppingListManagementPage;
