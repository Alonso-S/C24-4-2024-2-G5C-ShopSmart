import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import styles from "./notification-bar.module.css";

const NotificationBar: React.FC = () => {
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        // Simulating fetching notifications
        const fetchedNotifications = [
            "You usually buy milk every 7 days. It's been 6 days since your last purchase.",
            "Don't forget to restock on bread! You typically buy it every 5 days.",
        ];
        setNotifications(fetchedNotifications);
    }, []);

    return (
        <div className={styles.notificationBar}>
            <h3>
                <Bell size={20} /> Reminders
            </h3>
            <AnimatePresence>
                {notifications.map((notification, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={styles.notification}
                    >
                        {notification}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBar;
