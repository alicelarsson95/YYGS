const API_BASE_URL = "/api";

export const fetchApiKey = async (): Promise<string> => {
  let apiKey: string = localStorage.getItem("apiKey") ?? "";

  if (!apiKey) {
    const response = await fetch(`${API_BASE_URL}/keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`❌ Misslyckades att hämta API-nyckel: ${response.status}`);

    const data = await response.json();
    apiKey = data.key;
    localStorage.setItem("apiKey", apiKey);
  }

  return apiKey;
};

export const createTenant = async (tenantName: string) => {
  const apiKey = await fetchApiKey();

  const response = await fetch(`${API_BASE_URL}/tenant`, {
    method: "POST",
    headers: { "x-zocom": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ tenant: tenantName }),
  });

  if (!response.ok) throw new Error("❌ Misslyckades att skapa tenant");

  return response.json();
};

export const fetchMenu = async () => {
  const apiKey = await fetchApiKey();

  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: "GET",
    headers: { "x-zocom": apiKey, "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error(`❌ Misslyckades att hämta menyn: ${response.status}`);

  const data = await response.json();
  return data.items;
};
