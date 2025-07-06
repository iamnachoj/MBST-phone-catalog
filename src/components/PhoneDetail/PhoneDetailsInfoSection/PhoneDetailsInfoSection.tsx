import styles from "@/components/PhoneDetail/PhoneDetails.module.css";
import { PhoneDetailsData, StorageOptions } from "@/types/phone";
import { SpecList } from "@/components/PhoneDetail/PhoneDetailsInfoSection/SpectList/SpecList";

interface PhoneDetailsInfoSectionProps {
  phone: PhoneDetailsData;
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
  selectedStorage: StorageOptions | null;
  setSelectedStorage: (storage: StorageOptions) => void;
  totalPrice: number;
  handleAddToCart: () => void;
}

export function PhoneDetailsInfoSection({
  phone,
  selectedColor,
  setSelectedColor,
  selectedStorage,
  setSelectedStorage,
  totalPrice,
  handleAddToCart,
}: PhoneDetailsInfoSectionProps) {
  return (
    <section className={styles.info}>
      <h1 className={styles.title}>{phone.brand.toUpperCase()} {phone.name.toUpperCase()}</h1>
      <p className={styles.basePrice}>{phone.basePrice} EUR</p>

      <div className={styles.section}>
        <h3>ALMACENAMIENTO: ¿CUÁNTO ESPACIO NECESITAS?</h3>
        <div className={styles.storages}>
          {phone.storageOptions.map((storage) => (
            <button
              key={storage.capacity}
              className={`${styles.storageOption} ${selectedStorage?.capacity === storage.capacity ? styles.selected : ""}`}
              onClick={() => setSelectedStorage(storage)}
            >
              {storage.capacity}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3>COLORES</h3>
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

      <div className={styles.price}>
        <strong>PRECIO TOTAL:</strong> {totalPrice} €
      </div>

      <button
        className={styles.addButton}
        aria-label={'Add to Cart'}
        disabled={!selectedColor || !selectedStorage}
        onClick={handleAddToCart}
      >
        Añadir al carrito
      </button>

      <SpecList specs={phone.specs} />
    </section>
  );
}
