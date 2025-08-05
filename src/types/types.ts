// Updated types to match your API response structure

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface ImageFile {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}

export interface CategoryType {
  id: number;
  documentId: string;
  name: string; 
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  href: string | null;
  image: ImageFile;
}

export interface ColorImage {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageFile[];
}

export interface ColorType {
  id: number;
  documentId: string;
  codeColor: string;
  nameColor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  color_images: ColorImage[];
}

export interface ProductType {
  id: string;
  documentId: string;
  name: string;
  sku: string;
  original_price: number;
  discount: number;
  statusProduct: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  colors: ColorType[];
  category: CategoryType;
}

export interface ProductResponse {
  data: ProductType;
  meta: {};
}