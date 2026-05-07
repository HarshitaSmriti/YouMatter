const BASE_URL = "https://you-matter-backend.onrender.com/api/v1";

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error");
  }

  return res.json();
};
