import PhoneCard from "../PhoneCard/PhoneCard";
import { Phone } from "@/types/phone";
import styles from "./PhoneGrid.module.css";

interface PhoneGridProps {
  phones: Phone[];
}

export default function PhoneGrid({ phones }: PhoneGridProps) {
  return (
      <div className={styles.grid}>
        {phones.map((phone, index) => (
            <PhoneCard key={`${phone.id}-${index}`} phone={phone}/>
        ))}
      </div>
  );
}
