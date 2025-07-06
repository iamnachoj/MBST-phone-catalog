"use client";

import { PhoneDetailsData } from "@/types/phone";
import styles from "./PhoneDetails.module.css";
import Image from "next/image";
import Link from "next/link";
import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";
import { PhoneDetailsInfoSection } from "@/components/PhoneDetail/PhoneDetailsInfoSection/PhoneDetailsInfoSection";
import { usePhoneSelection } from "@/hooks/usePhoneSelection";

interface Props {
  phone: PhoneDetailsData;
}

export function PhoneDetails({ phone }: Props) {
  const {
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    totalPrice,
    selectedImage,
  } = usePhoneSelection(phone);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;

    // TODO: dispatch to cart context
    console.log("Added to cart:", {
      id: phone.id,
      color: selectedColor,
      storage: selectedStorage,
    });
  };

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
        <PhoneDetailsInfoSection
          phone={phone}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedStorage={selectedStorage}
          setSelectedStorage={setSelectedStorage}
          totalPrice={totalPrice}
          handleAddToCart={handleAddToCart}
        />
      </div>
      <SimilarProducts similarProducts={phone.similarProducts} />
    </>
  );
}
