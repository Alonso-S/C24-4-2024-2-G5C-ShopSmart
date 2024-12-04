import { ReactNode } from "react";
import styles from "../styles/Card.module.css";

interface CardProps {
    title: ReactNode;
    body: ReactNode;
    footer: ReactNode;
}

const Card = ({ title, body, footer }: CardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.cardBody}>{body}</div>
            <div className={styles.cardFooter}>{footer}</div>
        </div>
    );
};

export default Card;
