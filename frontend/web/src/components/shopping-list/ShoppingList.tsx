import { useState } from "react";
import styles from "./shopping-list.module.css"; // Importando el módulo CSS

interface ShoppingItem {
    id: number;
    name: string;
    quantity: number;
}

const ShoppingList = () => {
    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [newItem, setNewItem] = useState("");

    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, {
                id: Date.now(),
                name: newItem,
                quantity: 1,
            }]);
            setNewItem("");
        }
    };

    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        setItems(
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            ),
        );
    };

    return (
        <div className={styles.shoppingListCard}>
            <div className={styles.shoppingListHeader}>
                <h2>Shopping List</h2>
            </div>
            <div className={styles.shoppingListContent}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Add new item"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className={styles.input}
                    />
                    <button onClick={addItem} className={styles.addButton}>
                        +
                    </button>
                </div>
                <ul className={styles.itemList}>
                    {items.map((item) => (
                        <li key={item.id} className={styles.item}>
                            <span>{item.name}</span>
                            <div className={styles.itemActions}>
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                        )}
                                    className={styles.decrementButton}
                                >
                                    -
                                </button>
                                <span className={styles.quantity}>
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                        )}
                                    className={styles.incrementButton}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className={styles.removeButton}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShoppingList;
