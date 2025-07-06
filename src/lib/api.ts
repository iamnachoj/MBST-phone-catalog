export async function fetchPhones(limit = 20, search = "") {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com";

  if (!API_KEY || !BASE_URL) {
    throw new Error("Missing env vars");
  }

  const query = new URLSearchParams();
  query.set("limit", limit.toString());
  if (search) {
    query.set("search", search);
  }

  const res = await fetch(`${BASE_URL}/products?${query.toString()}`, {
    headers: {
      Accept: "application/json",
      "x-api-key": API_KEY!,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch phones");
  }

  return res.json();
}

export async function fetchPhoneById(id: string) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com";

  if (!API_KEY || !BASE_URL) {
    throw new Error("Missing env vars");
  }

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    headers: {
      Accept: "application/json",
      "x-api-key": API_KEY,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}

