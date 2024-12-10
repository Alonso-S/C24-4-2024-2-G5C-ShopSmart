import React, { useState } from "react";
import { motion } from "framer-motion";

import styles from "./notification-page.module.css";
import FilterBar from "../../components/filter-bar/FilterBar";
import NotificationList from "../../components/notification-list/NotificationList";
import Footer from "../../components/footer/Footer";

interface Notification {
    id: string;
    type: "promotion" | "price_drop" | "reminder";
    productName: string;
    offerType: string;
    store: string;
    isRead: boolean;
    date: Date;
}

const initialNotifications: Notification[] = [
    {
        id: "1",
        type: "promotion",
        productName: "Wireless Headphones",
        offerType: "20% off",
        store: "ElectroMart",
        isRead: false,
        date: new Date("2023-06-01"),
    },
    {
        id: "2",
        type: "price_drop",
        productName: "Smart Watch",
        offerType: "Price reduced",
        store: "GadgetWorld",
        isRead: false,
        date: new Date("2023-06-02"),
    },
    {
        id: "3",
        type: "reminder",
        productName: "Running Shoes",
        offerType: "Back in stock",
        store: "SportyGear",
        isRead: true,
        date: new Date("2023-06-03"),
    },
];

const NotificationPage: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(
        initialNotifications,
    );
    const [filter, setFilter] = useState<string>("all");

    const handleDismiss = (id: string) => {
        setNotifications(
            notifications.filter((notification) => notification.id !== id),
        );
    };

    const handleMarkAsRead = (id: string) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, isRead: true }
                    : notification
            ),
        );
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    const filteredNotifications = notifications.filter((notification) => {
        if (filter === "all") return true;
        if (filter === "unread") return !notification.isRead;
        return notification.type === filter;
    });

    return (
        <>
            <main className={styles.notificationPage}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.pageTitle}
                >
                    Notifications
                </motion.h1>
                <FilterBar
                    onFilterChange={handleFilterChange}
                    currentFilter={filter}
                />
                <NotificationList
                    notifications={filteredNotifications}
                    onDismiss={handleDismiss}
                    onMarkAsRead={handleMarkAsRead}
                />
            </main>
            <Footer />
        </>
    );
};

export default NotificationPage;
