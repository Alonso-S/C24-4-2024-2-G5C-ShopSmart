import React, { useState } from "react";
import Footer from "../components/footer/Footer";
import styles from "./Inventory.module.css";

interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    expirationDate: string;
}

const Inventory: React.FC = () => {
    const [items, setItems] = useState<InventoryItem[]>([
        { id: 1, name: "Milk", quantity: 1, expirationDate: "2023-06-30" },
        { id: 2, name: "Eggs", quantity: 12, expirationDate: "2023-07-15" },
        { id: 3, name: "Bread", quantity: 1, expirationDate: "2023-06-25" },
    ]);

    const [newItem, setNewItem] = useState({
        name: "",
        quantity: 1,
        expirationDate: "",
    });

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.name && newItem.quantity > 0 && newItem.expirationDate) {
            setItems([...items, { id: Date.now(), ...newItem }]);
            setNewItem({ name: "", quantity: 1, expirationDate: "" });
        }
    };

    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <>
            <main className={styles.container}>
                <h1 className={styles.title}>My Inventory</h1>

                <form onSubmit={addItem} className={styles.form}>
                    <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) =>
                            setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="Item name"
                        className={styles.input}
                    />
                    <input
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) =>
                            setNewItem({
                                ...newItem,
                                quantity: parseInt(e.target.value),
                            })}
                        placeholder="Quantity"
                        min="1"
                        className={`${styles.input} ${styles.quantityInput}`}
                    />
                    <input
                        type="date"
                        value={newItem.expirationDate}
                        onChange={(e) =>
                            setNewItem({
                                ...newItem,
                                expirationDate: e.target.value,
                            })}
                        className={`${styles.input} ${styles.dateInput}`}
                    />
                    <button type="submit" className={styles.addButton}>
                        Add Item
                    </button>
                </form>

                <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th className={styles.tableHeaderCell}>Item</th>
                            <th className={styles.tableHeaderCell}>Quantity</th>
                            <th className={styles.tableHeaderCell}>
                                Expiration Date
                            </th>
                            <th className={styles.tableHeaderCell}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className={styles.tableRow}>
                                <td className={styles.tableCell}>
                                    {item.name}
                                </td>
                                <td className={styles.tableCell}>
                                    {item.quantity}
                                </td>
                                <td className={styles.tableCell}>
                                    {item.expirationDate}
                                </td>
                                <td className={styles.tableCell}>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() =>
                                            removeItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <Footer />
        </>
    );
};

export default Inventory;
