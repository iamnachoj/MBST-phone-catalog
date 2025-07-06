import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  return (
      <nav className={styles.navbar}>
          <Link href="/" className={styles.title} aria-label="Inicio">
              <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={74}
                  height={28}
              />
          </Link>

          <button aria-label="shooping cart" className={styles.cartButton}>
              <Image
                  src="/cart.svg"
                  alt="Cart"
                  width={18}
                  height={18}
              />
              <span className={styles.quantity}>0</span>
          </button>
      </nav>
  );
}
