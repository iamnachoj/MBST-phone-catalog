import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <p className={styles.title}>Zara Phones</p>
      </Link>
      <div>
        <button aria-label="Carrito" className={styles.cartButton}>
          🛒
          <span className={styles.badge}>0</span>
        </button>
      </div>
    </nav>
  );
}
