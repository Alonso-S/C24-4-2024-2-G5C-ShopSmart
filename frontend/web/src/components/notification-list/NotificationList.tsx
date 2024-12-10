import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./notification-list.module.css";
import NotificationCard from "../cards/notification-card/NotificationCard";
import { NotificationType } from "../../types/Notification";

interface NotificationListProps {
    notifications: NotificationType[];
    onDismiss: (id: number) => void;
    onMarkAsRead: (id: number) => void;
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
