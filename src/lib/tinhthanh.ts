import { apiTinhThanh } from "@/lib/fetcherTinhThanh";
import type { ProvinceResponse, WardResponse } from "@/types/tinhthanh";

/**
 * Lấy danh sách tất cả tỉnh/thành phố
 */
export const getProvinces = async (): Promise<ProvinceResponse> => {
  const response = await apiTinhThanh.get<ProvinceResponse>("/api/v1/new-provinces?limit=100");
  return response.data;
};

/**
 * Lấy danh sách phường/xã theo mã tỉnh
 * @param provinceCode Mã tỉnh (ví dụ: "01" cho Hà Nội)
 */
export const getWardsByProvince = async (provinceCode: string): Promise<WardResponse> => {
  const response = await apiTinhThanh.get<WardResponse>(
    `/api/v1/new-provinces/${provinceCode}/wards?limit=100`
  );
  return response.data;
};
