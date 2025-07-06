import { fetchPhoneById } from "@/lib/api";
import { notFound } from "next/navigation";
import { PhoneDetails } from "@/components/PhoneDetail/PhoneDetails";

export default async function PhoneDetailPage({ params }: { params: { id: string } }) {
  const phone = await fetchPhoneById(params.id);

  if (!phone) {
    notFound();
  }

  return (
      <main>
        <PhoneDetails phone={phone} />
      </main>
  );
}
