const BASE_URL = "https://you-matter-backend.onrender.com/api/v1";

export const apiFetch = async (endpoint: string, options: any = {}) => {
  const token = localStorage.getItem("token");

  // 🔥 IMPORTANT: check token before request
  if (!token) {
    console.error("❌ No token found");
    throw new Error("Not authenticated");
  }

  console.log("TOKEN BEING SENT:", token); // debug

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // correct
      ...options.headers,
    },
  });

  const data = await res.json();

  //  HANDLE 401 PROPERLY
  if (res.status === 401) {
    console.error("❌ Unauthorized - token invalid or expired");
    localStorage.removeItem("token"); // clear bad token
    throw new Error("Session expired. Please login again.");
  }

  if (!res.ok) {
    throw new Error(data?.message || "API Error");
  }

  return data;
};