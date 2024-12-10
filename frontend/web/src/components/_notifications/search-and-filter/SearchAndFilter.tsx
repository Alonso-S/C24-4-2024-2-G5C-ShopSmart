import React from "react";
import { Search } from "lucide-react";
import styles from "./search-and-filter.module.css";

interface SearchAndFilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filter: string;
    setFilter: (filter: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = (
    { searchTerm, setSearchTerm, filter, setFilter },
) => {
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search purchases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={styles.filterSelect}
            >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="groceries">Groceries</option>
                {/* Add more categories as needed */}
            </select>
        </div>
    );
};

export default SearchAndFilter;
