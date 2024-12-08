import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart2, DollarSign, Map, MapPin, Search, Tag } from "lucide-react";
import styles from "./price-comparison-page.module.css";

// Mock data for demonstration
const products = [
    {
        id: 1,
        name: "Organic Bananas",
        image: "/placeholder.svg?height=200&width=200",
        description: "Fresh, organic bananas from local farms.",
        prices: [
            {
                supermarket: "SuperMart",
                price: 2.99,
                discount: "10% off",
                distance: 1.2,
                stock: "In Stock",
            },
            {
                supermarket: "LocalStore",
                price: 3.49,
                discount: "",
                distance: 0.5,
                stock: "Low Stock",
            },
            {
                supermarket: "FreshMarket",
                price: 3.29,
                discount: "5% off",
                distance: 2.1,
                stock: "In Stock",
            },
        ],
    },
    {
        id: 2,
        name: "Whole Grain Bread",
        image: "/placeholder.svg?height=200&width=200",
        description: "Nutritious whole grain bread, perfect for sandwiches.",
        prices: [
            {
                supermarket: "SuperMart",
                price: 3.99,
                discount: "",
                distance: 1.2,
                stock: "In Stock",
            },
            {
                supermarket: "LocalStore",
                price: 3.79,
                discount: "5% off",
                distance: 0.5,
                stock: "Out of Stock",
            },
            {
                supermarket: "FreshMarket",
                price: 4.29,
                discount: "Buy 1 Get 1 Free",
                distance: 2.1,
                stock: "In Stock",
            },
        ],
    },
];

export default function PriceComparison() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [sortOption, setSortOption] = useState("price");
    const [filterOption, setFilterOption] = useState("all");
    const [showMap, setShowMap] = useState(false);
    const [showPriceHistory, setShowPriceHistory] = useState(false);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement search functionality here
        console.log("Searching for:", searchTerm);
    };

    const handleSort = (option: string) => {
        setSortOption(option);
        // Implement sorting functionality here
    };

    const handleFilter = (option: string) => {
        setFilterOption(option);
        // Implement filtering functionality here
    };

    const handleBuy = (supermarket: string) => {
        // Implement buy functionality here
        console.log(`Buying from ${supermarket}`);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSearch} className={styles.searchBar}>
                <Search className={styles.searchIcon} />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a product or scan barcode..."
                    className={styles.searchInput}
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.searchButton}
                    type="submit"
                >
                    Search
                </motion.button>
            </form>

            <div className={styles.filtersContainer}>
                <div className={styles.filterGroup}>
                    <label htmlFor="sort">Sort by:</label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => handleSort(e.target.value)}
                        className={styles.select}
                    >
                        <option value="price">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                        <option value="distance">Distance: Closest</option>
                        <option value="discount">Biggest Discount</option>
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label htmlFor="filter">Filter:</label>
                    <select
                        id="filter"
                        value={filterOption}
                        onChange={(e) => handleFilter(e.target.value)}
                        className={styles.select}
                    >
                        <option value="all">All Items</option>
                        <option value="inStock">In Stock Only</option>
                        <option value="discounted">Discounted Items</option>
                    </select>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={styles.comparisonTable}
            >
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Supermarket</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Distance</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProduct.prices.map((price, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={styles.tableRow}
                            >
                                <td>{selectedProduct.name}</td>
                                <td>{price.supermarket}</td>
                                <td>
                                    <DollarSign className={styles.icon} />
                                    {price.price.toFixed(2)}
                                </td>
                                <td>
                                    {price.discount && (
                                        <motion.span
                                            whileHover={{ scale: 1.1 }}
                                            className={styles.discount}
                                        >
                                            <Tag className={styles.icon} />
                                            {price.discount}
                                        </motion.span>
                                    )}
                                </td>
                                <td>
                                    <MapPin className={styles.icon} />
                                    {price.distance} km
                                </td>
                                <td
                                    className={styles[
                                        price.stock.toLowerCase().replace(
                                            " ",
                                            "",
                                        )
                                    ]}
                                >
                                    {price.stock}
                                </td>
                                <td>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={styles.buyButton}
                                        onClick={() =>
                                            handleBuy(price.supermarket)}
                                    >
                                        Buy
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            <div className={styles.productDetailsContainer}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={styles.productDetails}
                >
                    <div className={styles.productImage}>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className={styles.productInfo}>
                        <h2>{selectedProduct.name}</h2>
                        <p>{selectedProduct.description}</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={styles.moreInfoButton}
                            onClick={() =>
                                setShowPriceHistory(!showPriceHistory)}
                        >
                            <BarChart2 className={styles.icon} />
                            {showPriceHistory ? "Hide" : "Show"} Price History
                        </motion.button>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {showPriceHistory && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className={styles.priceHistory}
                        >
                            <h3>Price History</h3>
                            {/* Implement price history chart here */}
                            <p>Price history chart will be displayed here.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.mapButton}
                onClick={() => setShowMap(!showMap)}
            >
                <Map className={styles.icon} />
                {showMap ? "Hide" : "Show"} Nearby Stores
            </motion.button>

            <AnimatePresence>
                {showMap && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.mapContainer}
                    >
                        {/* Implement map view here */}
                        <p>Map view of nearby stores will be displayed here.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
