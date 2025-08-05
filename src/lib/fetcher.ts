import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000/store";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_API_KEY || "",
  },
});
