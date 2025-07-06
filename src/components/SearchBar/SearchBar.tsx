"use client";

import { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSearch: (term: string) => void;
    initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onSearch(newValue);
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Buscar por marca o modelo..."
                value={value}
                onChange={handleChange}
                className={styles.input}
                aria-label="Buscar"
            />
        </div>
    );
}
