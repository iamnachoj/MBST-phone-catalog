"use client";

import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Napptilus Challenge. Todos los derechos
      reservados.
      <p className={styles.watermark}>
        Made with 💙 by{" "}
        <Link href={"https://iamnachoj.github.io/portfolio-website/index.html"}>
          Ignacio Jimenez
        </Link>
      </p>
    </footer>
  );
}
