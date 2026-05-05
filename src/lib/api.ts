const BASE_URL = "https://you-matter-backend.onrender.com/api/v1";

//  CORE FETCH FUNCTION
export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error(" No token found");
    throw new Error("Not authenticated");
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    //  safer JSON parse
    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    console.log(" API RESPONSE:", data);

    //  AUTH ERROR
    if (res.status === 401) {
      console.error(" Unauthorized - token expired");
      localStorage.removeItem("token");
      throw new Error("Session expired. Please login again.");
    }

   if (!res.ok) {
   throw new Error(data?.error || data?.message || JSON.stringify(data));
  }

    return data;
  } catch (err: any) {
    console.error(" API ERROR:", err.message);
    throw err;
  }
};


// 🔹 CHAT API (IMPORTANT)
export const sendMessage = async (message: string) => {
  const res = await apiFetch("/message", {
    method: "POST",
    body: { message },
  });

  //  Normalize response (VERY IMPORTANT)
  return res.reply || res.message || res.data || "No response from AI";
};