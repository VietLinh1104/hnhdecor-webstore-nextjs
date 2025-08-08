import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_TINHTHANHPHO_URL || "https://tinhthanhpho.com";
const token = process.env.NEXT_PUBLIC_TINHTHANHPHO; // Token dạng Bearer

export const apiTinhThanh = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
