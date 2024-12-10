import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./product-detail-page.module.css";
import ProductInfo from "../../components/product-info/ProductInfo";
import AddToCartButton from "../../components/buttons/add-to-cart-button/AddToCartButton";
import PriceComparison from "../../components/price-comparison/PriceComparison";
import ProductImage from "../../components/images/product-image/ProductImage";
import RecommendedProducts from "../../components/recommended-products/RecommendedProducts";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../../api/products";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        id: undefined,
        name: "",
        price: 0.00,
        description: "",
        image: "",
    });

    useEffect(() => {
        const fetchData = async (productId: number) => {
            try {
                const data = await getDetailProduct(productId);
                setProduct(data);
            } catch (error) {
                console.error(
                    "Error al obtener los datos del producto:",
                    error,
                );
                throw new Error("Error al obtener los datos del producto");
            }
        };
        if (id === undefined) {
            return;
        }
        fetchData(parseInt(id));
    }, [id]);
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
                    />
                    <PriceComparison productId={product.id} />
                    <AddToCartButton price={product.price} />
                </motion.div>
            </div>

            <RecommendedProducts />
        </main>
    );
};

export default ProductDetailPage;
