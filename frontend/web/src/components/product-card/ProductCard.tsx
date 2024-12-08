import styles from "./product-card.module.css";

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
    isRecommended?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = (
    { name, price, image, isRecommended },
) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                    <span className={styles.productName}>{name}</span>
                    {isRecommended && (
                        <span className={styles.recommendedBadge}>
                            AI Recommended
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.cardContent}>
                <img src={image} alt={name} className={styles.productImage} />
                <p className={styles.productPrice}>${price.toFixed(2)}</p>
            </div>
            <div className={styles.cardFooter}>
                <button className={styles.addToCartButton}>
                    Add to Cart
                </button>
                <button className={styles.likeButton}>
                    Like
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
