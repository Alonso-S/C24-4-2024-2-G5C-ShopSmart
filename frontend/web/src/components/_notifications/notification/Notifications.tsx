import React from "react";
import { Bell } from "lucide-react";
import styles from "./notifications.module.css";

const Notifications: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <Bell className={styles.icon} />
                Notifications
            </h2>
            <ul className={styles.notificationList}>
                <li className={styles.notificationItem}>
                    You bought Wireless Headphones 30 days ago. Time for a
                    review?
                </li>
                <li className={styles.notificationItem}>
                    Your favorite shampoo might need a refill soon. Last
                    purchased 2 months ago.
                </li>
            </ul>
        </div>
    );
};

export default Notifications;
