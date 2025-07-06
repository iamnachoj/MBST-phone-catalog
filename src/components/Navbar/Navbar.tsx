"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const { cart, loaded } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.title} aria-label="Logo: MBST">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={74}
          height={28}
          aria-hidden={true}
        />
      </Link>

      <Link href={'/cart'} aria-label="shooping cart" className={styles.cartButton}>
        <Image
          src="/cart.svg"
          alt="Cart"
          width={18}
          height={18}
          aria-hidden={true}
        />
        {loaded && (
          <span
            aria-label={`item quantity in the cart: ${itemCount}`}
            className={styles.quantity}
          >
            {itemCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
