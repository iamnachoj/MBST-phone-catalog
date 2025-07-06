"use client";

import { useEffect, useState } from "react";
import { fetchPhones } from "@/lib/api";
import { Phone } from "@/types/phone";
import PhoneCard from "@/components/PhoneCard/PhoneCard";
import styles from "./PhoneGrid.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";

interface Props {
  initialPhones: Phone[];
}

export default function PhoneGrid({ initialPhones }: Props) {
  const [phones, setPhones] = useState(initialPhones);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      setPhones(initialPhones);
      return;
    }

    let cancelled = false;
    const debounceDelay = 500;

    const handler = setTimeout(() => {
      const load = async () => {
        try {
          const data = await fetchPhones(20, search);
          if (!cancelled) setPhones(data);
        } catch (e) {
          console.error(e);
        }
      };

      load();
    }, debounceDelay);

    return () => {
      cancelled = true;
      clearTimeout(handler);
    };
  }, [search, initialPhones]);

  return (
    <div>
      <SearchBar onSearch={setSearch} initialValue={search} />
      <p className={styles.results}>{phones.length} RESULTADOS</p>
      <div className={styles.grid}>
        {phones.map((phone, index) => (
          <PhoneCard key={`${phone.id}-${index}`} phone={phone} />
        ))}
      </div>
    </div>
  );
}
