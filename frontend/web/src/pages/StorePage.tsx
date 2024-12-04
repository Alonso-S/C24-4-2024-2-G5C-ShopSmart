import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getStores } from "../api/store";
import styles from "../styles/StorePage.module.css";
export const StorePage = () => {
    const [stores, setStores] = useState([
        {
            id: null,
            name: null,
            description: null,
            address: null,
        },
    ]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const storesData = await getStores();
                setStores(storesData);
            } catch (error) {
                console.error("Error al obtener las tiendas:", error);
            }
        };

        fetchStores();
    }, []);

    return (
        <div>
            {stores.length === 0
                ? <div>Cargando...</div>
                : (
                    <div className={styles.cardContainer}>
                        {stores.map((store) => (
                            <Card
                                key={store.id}
                                title={store.name}
                                body={store.description}
                                footer={store.address}
                            />
                        ))}
                    </div>
                )}
        </div>
    );
};
