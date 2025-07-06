import { API_KEY, BASE_URL } from "./env";

export async function fetchPhones(limit = 20) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`, {
    headers: {
      Accept: "application/json",
      "x-api-key": API_KEY,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch phones");
  }

  return res.json();
}
