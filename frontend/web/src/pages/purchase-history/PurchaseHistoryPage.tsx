import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

import styles from "./purchase-history-page.module.css";
import SearchAndFilter from "../../components/_notifications/search-and-filter/SearchAndFilter";
import PurchaseList from "../../components/_notifications/purchase-list/PurchaseList";
import SpendingGraph from "../../components/graph/SpendingGraph";
import Notifications from "../../components/_notifications/notification/Notifications";

const PurchaseHistoryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    const handleDownloadReport = () => {
        // Implement CSV download logic here
        console.log("Downloading purchase report...");
    };

    return (
        <div className={styles.container}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.title}
            >
                Your Purchase History
            </motion.h1>

            <div className={styles.searchFilterContainer}>
                <SearchAndFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.purchaseListContainer}>
                    <PurchaseList searchTerm={searchTerm} filter={filter} />
                </div>
                <div className={styles.sidebarContainer}>
                    <SpendingGraph />
                    <Notifications />
                </div>
            </div>

            <div className={styles.downloadButtonContainer}>
                <button
                    onClick={handleDownloadReport}
                    className={styles.downloadButton}
                >
                    <Download className={styles.downloadIcon} />
                    Download Purchase Report
                </button>
            </div>
        </div>
    );
};

export default PurchaseHistoryPage;
