import React from "react";
import { motion } from "framer-motion";
import { Bell, Eye, Tag, TrendingDown, X } from "lucide-react";
import styles from "./notification-card.module.css";
import { NotificationType } from "../../../types/Notification";

interface NotificationCardProps {
    notification: NotificationType;
    onDismiss: (id: number) => void;
    onMarkAsRead: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = (
    { notification, onDismiss, onMarkAsRead },
) => {
    const getIcon = () => {
        switch (notification.type) {
            case "promotion":
                return <Tag className={styles.icon} />;
            case "price_drop":
                return <TrendingDown className={styles.icon} />;
            case "reminder":
                return <Bell className={styles.icon} />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            className={`${styles.notificationCard} ${
                notification.isRead ? styles.read : ""
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className={styles.iconContainer}>{getIcon()}</div>
            <div className={styles.content}>
                <h3 className={styles.productName}>
                    {notification.productName}
                </h3>
                <p className={styles.offerType}>{notification.offerType}</p>
                <p className={styles.store}>{notification.store}</p>
            </div>
            <div className={styles.actions}>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={styles.actionButton}
                    onClick={() => onMarkAsRead(notification.id)}
                    aria-label="Mark as read"
                >
                    <Eye size={20} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={styles.actionButton}
                    onClick={() => onDismiss(notification.id)}
                    aria-label="Dismiss notification"
                >
                    <X size={20} />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default NotificationCard;
