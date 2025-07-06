import { fetchPhoneById } from "@/lib/api";
import { notFound } from "next/navigation";
import { PhoneDetails } from "@/components/PhoneDetail/PhoneDetails";

type ParamsPromise = Promise<{ id: string }>;

export default async function PhoneDetailPage({ params }: { params: ParamsPromise }) {
    const { id } = await params;
    const phone = await fetchPhoneById(id);

    if (!phone) {
        notFound();
    }

    return (
        <main>
            <PhoneDetails phone={phone} />
        </main>
    );
}
