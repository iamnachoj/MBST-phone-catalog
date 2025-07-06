import { fetchPhoneById } from "@/lib/api";
import { notFound } from "next/navigation";
import { PhoneDetails } from "@/components/PhoneDetail/PhoneDetails";

interface Props {
  params: { id: string };
}

export default async function PhoneDetailPage({ params }: Props) {
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
