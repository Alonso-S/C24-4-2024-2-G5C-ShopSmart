import React from "react";
import Footer from "../components/footer/Footer";
import styles from "./Recommendations.module.css";

interface Recommendation {
    id: number;
    name: string;
    description: string;
    price: number;
    store: string;
}

const Recommendations: React.FC = () => {
    const recommendations: Recommendation[] = [
        {
            id: 1,
            name: "Organic Apples",
            description: "Fresh, locally sourced apples",
            price: 3.99,
            store: "FreshGrocer",
        },
        {
            id: 2,
            name: "Whole Grain Pasta",
            description: "Nutritious and delicious pasta",
            price: 2.49,
            store: "SuperMart",
        },
        {
            id: 3,
            name: "Greek Yogurt",
            description: "Creamy, high-protein yogurt",
            price: 4.99,
            store: "HealthyFoods",
        },
    ];

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Personalized Recommendations
                    </h1>
                    <div className={styles.recommendationGrid}>
                        {recommendations.map((item) => (
                            <div
                                key={item.id}
                                className={styles.recommendationCard}
                            >
                                <h2 className={styles.itemName}>{item.name}</h2>
                                <p className={styles.itemDescription}>
                                    {item.description}
                                </p>
                                <p className={styles.itemPrice}>
                                    ${item.price.toFixed(2)}
                                </p>
                                <p className={styles.itemStore}>{item.store}</p>
                                <button className={styles.addButton}>
                                    Add to List
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Recommendations;
