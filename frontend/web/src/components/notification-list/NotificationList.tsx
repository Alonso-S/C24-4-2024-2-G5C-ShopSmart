import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./notification-list.module.css";
import NotificationCard from "../cards/notification-card/NotificationCard";

interface Notification {
    id: string;
    type: "promotion" | "price_drop" | "reminder";
    productName: string;
    offerType: string;
    store: string;
    isRead: boolean;
    date: Date;
}

interface NotificationListProps {
    notifications: Notification[];
    onDismiss: (id: string) => void;
    onMarkAsRead: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = (
    { notifications, onDismiss, onMarkAsRead },
) => {
    return (
        <div className={styles.notificationList}>
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <NotificationCard
                            notification={notification}
                            onDismiss={onDismiss}
                            onMarkAsRead={onMarkAsRead}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationList;
