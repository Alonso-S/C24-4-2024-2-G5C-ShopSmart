import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Store } from "lucide-react";
import styles from "./price-comparison.module.css";
import { getStoresWithLowestPrices } from "../../api/store";

interface PriceComparisonProps {
    productId: number | undefined;
}

// const stores = [
//     { name: "Local Store", price: 0, distance: "0.5", units: "miles" },
//     { name: "City Center", price: 1 * 1.05, distance: "2.3" },
//     { name: "Mall Shop", price: 1 * 0.95, distance: "5.1" },
// ];

const PriceComparison: React.FC<PriceComparisonProps> = ({ productId }) => {
    const [stores, setStores] = useState([{
        name: "",
        price: 0,
        distance: "",
        units: "",
    }]);
    useEffect(() => {
        if (productId === undefined) return;
        const getStores = async (productId: number) => {
            try {
                const data = await getStoresWithLowestPrices(productId);
                setStores(data);
            } catch (error) {
                console.error("Error fetching stores:", error);
                throw new Error();
            }
        };
        getStores(productId);
    }, [productId]);

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
                            <span>{`${store.distance} ${store.units}`}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default PriceComparison;
