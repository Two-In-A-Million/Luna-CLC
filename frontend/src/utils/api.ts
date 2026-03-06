export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("adminToken");

  const isFormData = options.body instanceof FormData;

  const response = await fetch(`http://localhost:3000/api/admin${url}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
};