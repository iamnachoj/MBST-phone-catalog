import { fetchPhones } from "@/lib/api";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PhoneGrid from "@/components/PhoneGrid/PhoneGrid";
import { Phone } from "@/types/phone";
import styles from "./page.module.css";

export default async function HomePage() {
  const phones: Phone[] = await fetchPhones();

  return (
      <>
          <div className={styles.container}>
              <Navbar />
              <main>
                  <h1 className={styles.title}>Catálogo de Teléfonos</h1>
                  <PhoneGrid phones={phones}/>
              </main>
          </div>
          <Footer/>
      </>
  );
}
