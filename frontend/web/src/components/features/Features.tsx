import { DollarSign, Lightbulb, Map } from "lucide-react";
import styles from "./features.module.css";

export default function Features() {
    const features = [
        {
            icon: <Lightbulb className={styles.icon} />,
            title: "Personalized Recommendations",
            description:
                "Get AI-powered suggestions tailored to your preferences and habits.",
        },
        {
            icon: <DollarSign className={styles.icon} />,
            title: "Price Comparison",
            description:
                "Compare prices across multiple stores to find the best deals.",
        },
        {
            icon: <Map className={styles.icon} />,
            title: "Optimized Shopping Routes",
            description:
                "Save time with efficient shopping routes based on your list and location.",
        },
    ];

    return (
        <section className={styles.features}>
            <h2 className={styles.title}>Our Features</h2>
            <div className={styles.grid}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.feature}>
                        {feature.icon}
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDescription}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
