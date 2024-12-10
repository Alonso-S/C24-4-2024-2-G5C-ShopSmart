import React from "react";
import { motion } from "framer-motion";
import styles from "./filter-bar.module.css";

interface FilterBarProps {
    onFilterChange: (filter: string) => void;
    currentFilter: string;
}

const FilterBar: React.FC<FilterBarProps> = (
    { onFilterChange, currentFilter },
) => {
    const filters = [
        { value: "all", label: "All" },
        { value: "unread", label: "Unread" },
        { value: "promotion", label: "Promotions" },
        { value: "price_drop", label: "Price Drops" },
        { value: "reminder", label: "Reminders" },
    ];

    return (
        <div className={styles.filterBar}>
            {filters.map((filter) => (
                <motion.button
                    key={filter.value}
                    className={`${styles.filterButton} ${
                        currentFilter === filter.value ? styles.active : ""
                    }`}
                    onClick={() => onFilterChange(filter.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {filter.label}
                </motion.button>
            ))}
        </div>
    );
};

export default FilterBar;
