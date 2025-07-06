import { fetchPhones } from "@/lib/api";
import PhoneGrid from "@/components/PhoneGrid/PhoneGrid";
import { Phone } from "@/types/phone";

export default async function HomePage() {
  const phones: Phone[] = await fetchPhones();
  return (
    <main>
      <PhoneGrid initialPhones={phones} />
    </main>
  );
}
