import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import styles from "./home-page.module.css";

// Mock data for demonstration
const user = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=100&width=100",
};

const purchases = [
    {
        id: 1,
        name: "Wireless Headphones",
        quantity: 1,
        price: 129.99,
        date: "2023-05-15",
    },
    {
        id: 2,
        name: "Smart Watch",
        quantity: 1,
        price: 199.99,
        date: "2023-05-10",
    },
    {
        id: 3,
        name: "Laptop Stand",
        quantity: 2,
        price: 39.99,
        date: "2023-05-05",
    },
];

const recommendations = [
    {
        id: 1,
        name: "Bluetooth Speaker",
        image: "/placeholder.svg?height=100&width=100",
        price: 79.99,
        description: "High-quality portable speaker with 20-hour battery life.",
    },
    {
        id: 2,
        name: "Ergonomic Mouse",
        image: "/placeholder.svg?height=100&width=100",
        price: 49.99,
        description: "Comfortable mouse designed for long hours of use.",
    },
    {
        id: 3,
        name: "Noise-Cancelling Earbuds",
        image: "/placeholder.svg?height=100&width=100",
        price: 149.99,
        description: "Premium earbuds with active noise cancellation.",
    },
];

const initialShoppingLists = ["Groceries", "Electronics", "Home Decor"];

const HomePage = () => {
    const [shoppingLists, setShoppingLists] = useState(initialShoppingLists);
    const [newList, setNewList] = useState("");

    const addShoppingList = () => {
        if (newList.trim()) {
            setShoppingLists([...shoppingLists, newList.trim()]);
            setNewList("");
        }
    };

    const removeShoppingList = (index: number) => {
        setShoppingLists(shoppingLists.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.container}>
                <div className={styles.columns}>
                    {/* Left Column */}
                    <motion.div
                        className={styles.leftColumn}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.profile}>
                            <div className={styles.avatar}>
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    width={128}
                                    height={128}
                                    className={styles.avatarImage}
                                />
                            </div>
                            <h2 className={styles.userName}>{user.name}</h2>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        {/* Your Purchases Section */}
                        <motion.section
                            className={styles.section}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className={styles.sectionTitle}>
                                Your Purchases
                            </h2>
                            <div className={styles.card}>
                                <ul className={styles.purchaseList}>
                                    {purchases.map((purchase) => (
                                        <li
                                            key={purchase.id}
                                            className={styles.purchaseItem}
                                        >
                                            <div
                                                className={styles
                                                    .purchaseDetails}
                                            >
                                                <span
                                                    className={styles
                                                        .productName}
                                                >
                                                    {purchase.name}
                                                </span>
                                                <span>
                                                    Qty: {purchase.quantity}
                                                </span>
                                                <span>
                                                    ${purchase.price.toFixed(2)}
                                                </span>
                                                <span>{purchase.date}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.section>

                        {/* Recommendations Section */}
                        <motion.section
                            className={styles.section}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h2 className={styles.sectionTitle}>
                                Recommendations
                            </h2>
                            <div className={styles.recommendationsGrid}>
                                {recommendations.map((product) => (
                                    <div
                                        key={product.id}
                                        className={styles.productCard}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            width={300}
                                            height={200}
                                            className={styles.productImage}
                                        />
                                        <div className={styles.productInfo}>
                                            <h3 className={styles.productName}>
                                                {product.name}
                                            </h3>
                                            <p
                                                className={styles
                                                    .productDescription}
                                            >
                                                {product.description}
                                            </p>
                                            <p className={styles.productPrice}>
                                                ${product.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Shopping Lists Section */}
                        <motion.section
                            className={styles.section}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <h2 className={styles.sectionTitle}>
                                Shopping Lists
                            </h2>
                            <div className={styles.card}>
                                <ul className={styles.shoppingLists}>
                                    {shoppingLists.map((list, index) => (
                                        <li
                                            key={index}
                                            className={styles.shoppingListItem}
                                        >
                                            <span>{list}</span>
                                            <button
                                                onClick={() =>
                                                    removeShoppingList(index)}
                                                className={styles.removeButton}
                                            >
                                                <Minus
                                                    className={styles.icon}
                                                />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.addListForm}>
                                    <input
                                        type="text"
                                        value={newList}
                                        onChange={(e) =>
                                            setNewList(e.target.value)}
                                        placeholder="New shopping list"
                                        className={styles.input}
                                    />
                                    <button
                                        onClick={addShoppingList}
                                        className={styles.addButton}
                                    >
                                        <Plus className={styles.icon} />{" "}
                                        Add List
                                    </button>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { HomePage };
