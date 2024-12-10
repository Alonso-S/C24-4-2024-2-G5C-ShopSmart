import React, { useState } from "react";
import { motion } from "framer-motion";

// import Navigation from "./Navigation";
import styles from "./product-detail-page.module.css";
import ProductInfo from "../../components/product-info/ProductInfo";
import AddToCartButton from "../../components/buttons/add-to-cart-button/AddToCartButton";
import PriceComparison from "../../components/price-comparison/PriceComparison";
import ProductImage from "../../components/images/product-image/ProductImage";
import RecommendedProducts from "../../components/recommended-products/RecommendedProducts";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    image: string;
    sizes: string[];
    colors: string[];
}

const sampleProduct: Product = {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    description:
        "Experience crystal-clear sound with our premium wireless headphones. Featuring noise-cancellation technology and long-lasting battery life.",
    rating: 4.5,
    reviewCount: 128,
    image: "/placeholder.svg?height=500&width=500",
    sizes: ["Small", "Medium", "Large"],
    colors: ["Black", "White", "Blue"],
};

const ProductDetailPage: React.FC = () => {
    const [product] = useState<Product>(sampleProduct);
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState<string>(
        product.colors[0],
    );

    return (
        <main className={styles.container}>
            <div className={styles.productContent}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.leftColumn}
                >
                    <ProductImage image={product.image} name={product.name} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.rightColumn}
                >
                    <ProductInfo
                        product={product}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    />
                    <PriceComparison price={product.price} />
                    <AddToCartButton price={product.price} />
                </motion.div>
            </div>

            <RecommendedProducts />
        </main>
    );
};

export default ProductDetailPage;
