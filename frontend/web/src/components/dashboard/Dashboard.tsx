import ProductCard from "../product-card/ProductCard";
import ShoppingList from "../shopping-list/ShoppingList";
import styles from "./dashboard.module.css";

const Dashboard = () => {
    // Mock data for product recommendations
    const recommendedProducts = [
        {
            id: 1,
            name: "Organic Apples",
            price: 2.99,
            image: "/placeholder.svg?height=200&width=200",
        },
        {
            id: 2,
            name: "Whole Grain Bread",
            price: 3.49,
            image: "/placeholder.svg?height=200&width=200",
        },
        {
            id: 3,
            name: "Free-Range Eggs",
            price: 4.99,
            image: "/placeholder.svg?height=200&width=200",
        },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome to ShopSmart</h1>

            <div className={styles.grid}>
                <div>
                    <h2 className={styles.subHeading}>Your Shopping List</h2>
                    <ShoppingList />
                </div>

                <div>
                    <h2 className={styles.subHeading}>Recommended Products</h2>
                    <div className={styles.productGrid}>
                        {recommendedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                isRecommended={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
