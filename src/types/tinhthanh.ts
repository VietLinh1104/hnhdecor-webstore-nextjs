// types/address.ts

export interface BaseItem {
  code: string;
  name: string;
  type: string; // Ví dụ: "Thành phố", "Tỉnh", "Phường", "Xã"
}

export interface Province extends BaseItem {}

export interface Ward extends BaseItem {
  province_code: string;
}

export interface Metadata {
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  metadata: Metadata;
}

// Cụ thể hóa từng response
export type ProvinceResponse = ApiResponse<Province>;
export type WardResponse = ApiResponse<Ward>;
