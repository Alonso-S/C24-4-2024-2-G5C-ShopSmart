import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import styles from "./home-page.module.css";
import UserContext from "../../context/user/UserContext";
import { getRecentPurchases } from "../../api/purchase";
import { getProductRecommendations } from "../../api/recommendation";
import { getLatestShoppingLists } from "../../api/shopping-list";

const HomePage = () => {
    const user = useContext(UserContext);

    const [shoppingLists, setShoppingLists] = useState([{
        id: undefined,
        name: "",
    }]);

    const [purchases, setPurchases] = useState([
        {
            id: undefined,
            name: "",
            quantity: undefined,
            date: undefined,
        },
    ]);
    const [recommendations, setRecommendations] = useState([{
        id: undefined,
        name: "",
        image: "",
        description: "",
    }]);

    useEffect(() => {
        const getShoppingList = async (userId: number) => {
            try {
                const data = await getLatestShoppingLists(userId);
                setShoppingLists(data);
            } catch (error) {
                console.error("Error al obtener la lista de compras:", error);
            }
        };
        const getRecommendations = async (userId: number) => {
            try {
                const data = await getProductRecommendations(userId);
                console.log(data);
                setRecommendations(data);
            } catch (error) {
                console.error("Error al obtener las recomendaciones:", error);
            }
        };

        const getPurchases = async (userId: number) => {
            try {
                const data = await getRecentPurchases(userId);
                console.log(data);
                setPurchases(data);
            } catch (error) {
                console.error("Error al obtener las compras:", error);
            }
        };
        if (user.id === undefined) {
            return;
        }
        getPurchases(user.id);
        getRecommendations(user.id);
        getShoppingList(user.id);
    }, [user.id]);

    const [newList, setNewList] = useState("");

    const addShoppingList = () => {
    };

    const removeShoppingList = (index: number) => {
        setShoppingLists(shoppingLists.filter((_, i) => i !== index));
    };

    const isShoppingListsEmpty = shoppingLists.every((list) =>
        list.name === ""
    );

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
                                    src={user.image}
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
                                {isShoppingListsEmpty
                                    ? <></>
                                    : (
                                        <ul className={styles.shoppingLists}>
                                            {shoppingLists.map((
                                                list,
                                                index,
                                            ) => (
                                                <li
                                                    key={index}
                                                    className={styles
                                                        .shoppingListItem}
                                                >
                                                    <span>{list.name}</span>
                                                    <button
                                                        onClick={() =>
                                                            removeShoppingList(
                                                                index,
                                                            )}
                                                        className={styles
                                                            .removeButton}
                                                    >
                                                        <Minus
                                                            className={styles
                                                                .icon}
                                                        />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

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
