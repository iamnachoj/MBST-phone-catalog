import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/app/page.module.css";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "MBST Store",
  description:
    "Functional app built for Zara challenge, using SSR and fully ready for SEO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
