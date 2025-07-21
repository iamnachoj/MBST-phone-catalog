import Link from "next/link";
import styles from "./PhoneCard.module.css";
import {Phone} from "@/types/phone";
import Image from "next/image";
interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  return (
      <Link href={`/phone/${phone.id}`} className={styles.card}>
          <div className={styles.cardContent}>
              <Image
                  src={phone.imageUrl}
                  alt={`${phone.brand} ${phone.name}`}
                  className={styles.image}
                  loading="lazy"
              />
              <div className={styles.infoRow}>
                  <div className={styles.left}>
                      <span className={styles.brand}>{phone.brand.toUpperCase()}</span>
                      <span className={styles.name}>{phone.name.toUpperCase()}</span>
                  </div>
                  <div className={styles.price}>{phone.basePrice} EUR</div>
              </div>
          </div>
      </Link>
  );
}
