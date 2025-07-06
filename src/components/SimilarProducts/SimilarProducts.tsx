// src/components/SimilarProducts/SimilarProducts.tsx

import Link from "next/link";
import Image from "next/image";
import styles from "./SimilarProducts.module.css";

interface SimilarProduct {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

interface SimilarProductsProps {
  similarProducts: SimilarProduct[];
}

export default function SimilarProducts({
  similarProducts,
}: SimilarProductsProps) {
  if (!similarProducts || similarProducts.length === 0) return null;

  return (
    <aside className={styles.similar}>
      <h3>Productos similares</h3>
      <div className={styles.similarGrid}>
        {similarProducts.map((similar, index) => (
          <Link
            key={`${similar.id}-${index}`}
            href={`/phone/${similar.id}`}
            className={styles.similarCard}
          >
            <Image
              src={similar.imageUrl}
              alt={similar.name}
              width={200}
              height={200}
              className={styles.similarImage}
            />
            <div className={styles.similarInfo}>
              <span>
                {similar.brand} {similar.name}
              </span>
              <span>{similar.basePrice} €</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
