"use client";

import { useState } from "react";
import { PhoneDetails } from "@/types/phone";
import styles from "./PhoneDetail.module.css";
import Image from "next/image";
import Link from "next/link";
import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";

interface Props {
  phone: PhoneDetails;
}

export function PhoneDetail({ phone }: Props) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<{
    capacity: string;
    price: number;
  } | null>(null);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;

    // TODO: dispatch to cart context
    console.log("Added to cart:", {
      id: phone.id,
      color: selectedColor,
      storage: selectedStorage,
    });
  };

  const totalPrice = phone.basePrice + (selectedStorage?.price ?? 0);
  const selectedImage =
    phone.colorOptions.find((c) => c.name === selectedColor)?.imageUrl ||
    phone.colorOptions[0]?.imageUrl;

  return (
    <>
      <div className={styles.container}>
        <section className={styles.gallery}>
          <Link className={styles.backButton} href={"/"}>
            ⬅ Volver
          </Link>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={phone.name}
              width={500}
              height={500}
              className={styles.mainImage}
            />
          )}
        </section>

        <section className={styles.info}>
          <h1 className={styles.title}>
            {phone.brand} {phone.name}
          </h1>
          <p className={styles.description}>{phone.description}</p>

          <div className={styles.section}>
            <h3>Colores</h3>
            <div className={styles.colors}>
              {phone.colorOptions.map((color) => (
                <button
                  key={color.name}
                  className={`${styles.colorSwatch} ${selectedColor === color.name ? styles.selected : ""}`}
                  style={{ backgroundColor: color.hexCode }}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3>Almacenamiento</h3>
            <div className={styles.storages}>
              {phone.storageOptions.map((storage) => (
                <button
                  key={storage.capacity}
                  className={`${styles.storageOption} ${selectedStorage?.capacity === storage.capacity ? styles.selected : ""}`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage.capacity} - +{storage.price}€
                </button>
              ))}
            </div>
          </div>

          <div className={styles.price}>
            <strong>Precio total:</strong> {totalPrice} €
          </div>

          <button
            className={styles.addButton}
            disabled={!selectedColor || !selectedStorage}
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>

          <div className={styles.specs}>
            <h3>Especificaciones técnicas</h3>
            <ul>
              {Object.entries(phone.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <SimilarProducts similarProducts={phone.similarProducts} />
    </>
  );
}
