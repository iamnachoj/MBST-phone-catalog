// app/cart/page.tsx
"use client";

import { useCart } from "@/hooks/useCart";
import styles from "./CartPage.module.css";
import Link from "next/link";

export default function CartPage() {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => {
    const itemPrice = item.basePrice + item.storage.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Tu carrito está vacío 🛒</h2>
        <Link href="/" className={styles.backButton}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>TU CARRITO</h1>
      <ul className={styles.itemList}>
        {cart.map((item) => (
          <li
            key={`${item.id}-${item.color}-${item.storage.capacity}`}
            className={styles.item}
          >
            <img src={item.imageUrl} alt={item.name} className={styles.image} />
            <div className={styles.info}>
              <h2>
                {item.brand.toUpperCase()} {item.name.toUpperCase()}
              </h2>
              <p>Color: {item.color}</p>
              <p>Almacenamiento: {item.storage.capacity}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio unitario: {item.basePrice + item.storage.price} €</p>
              <p className={styles.totalPriceMobile}>
                Total: {(item.basePrice + item.storage.price) * item.quantity} €
              </p>
            </div>
            <p className={styles.totalPriceDesktop}>
              Total: {(item.basePrice + item.storage.price) * item.quantity} €
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.summary}>
        <h2>Total del carrito: {total} €</h2>
        <button className={styles.checkoutButton} disabled>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
