import React from "react";
import { motion } from "framer-motion";
import { MapPin, Store } from "lucide-react";
import styles from "./price-comparison.module.css";

interface PriceComparisonProps {
    price: number;
}

const PriceComparison: React.FC<PriceComparisonProps> = ({ price }) => {
    const stores = [
        { name: "Local Store", price: price, distance: "0.5 miles" },
        { name: "City Center", price: price * 1.05, distance: "2.3 miles" },
        { name: "Mall Shop", price: price * 0.95, distance: "5.1 miles" },
    ];

    return (
        <div className={styles.priceComparison}>
            <h3>Price Comparison</h3>
            {stores.map((store, index) => (
                <motion.div
                    key={store.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={styles.storeItem}
                >
                    <div className={styles.storeInfo}>
                        <Store size={16} />
                        <span>{store.name}</span>
                    </div>
                    <div className={styles.priceDistance}>
                        <span
                            className={store.price ===
                                    Math.min(...stores.map((s) => s.price))
                                ? styles.bestPrice
                                : ""}
                        >
                            ${store.price.toFixed(2)}
                        </span>
                        <div className={styles.distance}>
                            <MapPin size={12} />
                            <span>{store.distance}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default PriceComparison;
