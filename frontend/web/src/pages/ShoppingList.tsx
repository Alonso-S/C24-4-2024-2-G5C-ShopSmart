import React, { useState } from "react";
import Footer from "../components/footer/Footer";
import styles from "./ShoppingList.module.css";

interface ShoppingItem {
    id: number;
    name: string;
    quantity: number;
    store: string;
    price: number;
}

const ShoppingList: React.FC = () => {
    const [items, setItems] = useState<ShoppingItem[]>([
        { id: 1, name: "Milk", quantity: 1, store: "SuperMart", price: 2.99 },
        {
            id: 2,
            name: "Bread",
            quantity: 2,
            store: "FreshGrocer",
            price: 1.99,
        },
        { id: 3, name: "Eggs", quantity: 1, store: "SuperMart", price: 3.49 },
    ]);

    const [newItem, setNewItem] = useState("");

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim()) {
            setItems([...items, {
                id: items.length + 1,
                name: newItem,
                quantity: 1,
                store: "TBD",
                price: 0,
            }]);
            setNewItem("");
        }
    };

    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>My Shopping List</h1>
                    <form onSubmit={addItem} className={styles.addItemForm}>
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Add new item"
                            className={styles.input}
                        />
                        <button type="submit" className={styles.addButton}>
                            Add Item
                        </button>
                    </form>
                    <ul className={styles.itemList}>
                        {items.map((item) => (
                            <li key={item.id} className={styles.item}>
                                <span className={styles.itemName}>
                                    {item.name}
                                </span>
                                <span className={styles.itemQuantity}>
                                    Qty: {item.quantity}
                                </span>
                                <span className={styles.itemStore}>
                                    {item.store}
                                </span>
                                <span className={styles.itemPrice}>
                                    ${item.price.toFixed(2)}
                                </span>
                                <button
                                    onClick={() =>
                                        removeItem(item.id)}
                                    className={styles.removeButton}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ShoppingList;
