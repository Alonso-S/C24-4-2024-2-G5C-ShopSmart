import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Filter,
    Home,
    ShoppingBag,
    ShoppingCart,
    SortDesc,
    User,
} from "lucide-react";
import styles from "./recommendations.module.css";
import ProductCard from "../../components/product-card2/ProductCard";
import ViewCartButton from "../../components/view-cart-button/ViewCartButton";

// Mock data for demonstration
const user = {
    name: "John",
    preferences: ["Fruit", "Vegetables", "Dairy"],
};

const products = [
    {
        id: 1,
        name: "Organic Bananas",
        category: "Fruit",
        price: 2.99,
        image: "https://via.placeholder.com/200x200?text=Bananas",
        description: "Fresh, organic bananas from local farms.",
    },
    {
        id: 2,
        name: "Whole Grain Bread",
        category: "Bakery",
        price: 3.99,
        image: "https://via.placeholder.com/200x200?text=Bread",
        description: "Nutritious whole grain bread, perfect for sandwiches.",
    },
    {
        id: 3,
        name: "Greek Yogurt",
        category: "Dairy",
        price: 4.49,
        image: "https://via.placeholder.com/200x200?text=Yogurt",
        description: "Creamy Greek yogurt, high in protein and probiotics.",
    },
    {
        id: 4,
        name: "Avocado",
        category: "Fruit",
        price: 1.99,
        image: "https://via.placeholder.com/200x200?text=Avocado",
        description: "Ripe avocados, perfect for guacamole or toast.",
    },
    {
        id: 5,
        name: "Spinach",
        category: "Vegetables",
        price: 2.49,
        image: "https://via.placeholder.com/200x200?text=Spinach",
        description: "Fresh, organic spinach leaves for salads or cooking.",
    },
    {
        id: 6,
        name: "Almond Milk",
        category: "Dairy",
        price: 3.29,
        image: "https://via.placeholder.com/200x200?text=Almond+Milk",
        description: "Unsweetened almond milk, great for smoothies or cereal.",
    },
];

const categories = ["All", "Fruit", "Vegetables", "Dairy", "Bakery"];
const sortOptions = [
    "Recommended",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
    "Top Rated",
];

export default function Recommendations() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Recommended");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            let filtered = products;
            if (selectedCategory !== "All") {
                filtered = products.filter((product) =>
                    product.category === selectedCategory
                );
            }

            switch (sortBy) {
                case "Price: Low to High":
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case "Price: High to Low":
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                    // Add other sorting logic here
            }

            setFilteredProducts(filtered);
            setIsLoading(false);
        }, 1000);
    }, [selectedCategory, sortBy]);

    const addToCart = (productId: number) => {
        console.log(`Added product ${productId} to cart`);
        // Implement cart functionality here
    };

    return (
        <div className={styles.container}>
            <ViewCartButton />
            <div className={styles.columns}>
                <motion.div
                    className={styles.greeting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Welcome back, {user.name}!</h1>
                    <p>We've handpicked these just for you!</p>
                </motion.div>
                <div className={styles.recommendationsContainer}>
                    <div className={styles.filtersContainer}>
                        <div className={styles.filterGroup}>
                            <Filter className={styles.icon} />
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)}
                                className={styles.select}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.filterGroup}>
                            <SortDesc className={styles.icon} />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={styles.select}
                            >
                                {sortOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {isLoading
                        ? (
                            <div className={styles.loadingSpinner}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                            </div>
                        )
                        : (
                            <motion.div
                                className={styles.productGrid}
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                            >
                                <AnimatePresence>
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            addToCart={addToCart}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                </div>
            </div>
            <motion.button
                className={styles.ctaButton}
                whileHover={{ scale: 1.05, backgroundColor: "#00ACC1" }}
                whileTap={{ scale: 0.95 }}
            >
                Add All to Cart
                <ShoppingBag className={styles.icon} />
            </motion.button>
            <footer className={styles.footer}>
                <a href="#">
                    <Home className={styles.footerIcon} /> Home
                </a>
                <a href="#">
                    <User className={styles.footerIcon} /> Profile
                </a>
                <a href="#">
                    <ShoppingCart className={styles.footerIcon} /> Cart
                </a>
            </footer>
        </div>
    );
}
