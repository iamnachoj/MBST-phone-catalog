import { fetchPhoneById } from "@/lib/api";
import { notFound } from "next/navigation";
import { PhoneDetail } from "@/components/PhoneDetail/PhoneDetail";

interface Props {
    params: { id: string };
}

export default async function PhoneDetailPage({ params }: Props) {
    const phone = await fetchPhoneById(params.id);

    if (!phone) {
        notFound(); // devuelve 404 si no hay teléfono
    }

    return (
        <main>
            <PhoneDetail phone={phone} />
        </main>
    );
}
