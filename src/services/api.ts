const API_BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

export const fetchApiKey = async (): Promise<string> => {
  let apiKey: string = localStorage.getItem("apiKey") ?? "";

  if (!apiKey) {
    const response = await fetch(`${API_BASE_URL}/keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`Misslyckades att hämta API-nyckel: ${response.status}`);

    const data = await response.json();
    apiKey = data.key;
    localStorage.setItem("apiKey", apiKey);
  }

  return apiKey;
};

export const fetchMenu = async () => {
  const apiKey = await fetchApiKey();

  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: "GET",
    headers: { "x-zocom": apiKey, "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error(`Misslyckades att hämta menyn: ${response.status}`);

  const data = await response.json();
  return data.items;
};

export const createOrder = async (orderItems: any[], tenantId?: string) => {
  const apiKey = await fetchApiKey();

  tenantId = tenantId ?? localStorage.getItem("tenantId") ?? "";

  if (!tenantId) {
    throw new Error(" Tenant-ID saknas!");
  }

  const response = await fetch(`${API_BASE_URL}/${tenantId}/orders`, {
    method: "POST",
    headers: { "x-zocom": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ items: [orderItems.length] }),
  });

  if (!response.ok) throw new Error("Misslyckades att skapa order");

  return response.json();
};

export const getOrderStatus = async (orderId: string, tenantId?: string) => {
  const apiKey = await fetchApiKey();

  tenantId = tenantId ?? localStorage.getItem("tenantId") ?? "";

  if (!tenantId) {
    throw new Error("Tenant-ID saknas!");
  }

  const response = await fetch(`${API_BASE_URL}/${tenantId}/orders/${orderId}`, {
    method: "GET",
    headers: { "x-zocom": apiKey },
  });

  if (!response.ok) throw new Error("Kunde inte hämta orderstatus");

  return response.json();
};
