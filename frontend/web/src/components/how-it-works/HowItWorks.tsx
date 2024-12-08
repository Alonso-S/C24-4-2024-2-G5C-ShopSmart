import { DollarSign, Lightbulb, LogIn, Map } from "lucide-react";
import styles from "./how-it-works.module.css";

export default function HowItWorks() {
    const steps = [
        { icon: <LogIn className={styles.icon} />, title: "Log in" },
        {
            icon: <Lightbulb className={styles.icon} />,
            title: "Receive personalized suggestions",
        },
        {
            icon: <DollarSign className={styles.icon} />,
            title: "Compare prices",
        },
        {
            icon: <Map className={styles.icon} />,
            title: "Optimize shopping routes",
        },
    ];

    return (
        <section className={styles.howItWorks}>
            <h2 className={styles.title}>How It Works</h2>
            <div className={styles.steps}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.step}>
                        {step.icon}
                        <p className={styles.stepTitle}>{step.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
