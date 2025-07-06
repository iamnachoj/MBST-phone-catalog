import Link from "next/link";
import styles from "./PhoneCard.module.css";
import {Phone} from "@/types/phone";
interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  return (
      <Link href={`/phone/${phone.id}`} className={styles.card}>
        <img
            src={phone.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
            className={styles.image}
            loading="lazy"
        />
        <h2 className={styles.title}>
          {phone.name} {phone.brand}
        </h2>
        <p className={styles.price}>Desde {phone.basePrice}€</p>
      </Link>
  );
}
