import { API_URL } from "../config.ts";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("adminToken");

  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_URL}api/admin${url}`, {
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