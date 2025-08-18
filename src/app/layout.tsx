// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import FloatingContactButton from '@/components/FloatingContactButton';

export const metadata: Metadata = {
  title: 'H&H Decor - Cửa hàng đồ trang trí trực tuyến',
  description:
    'Khám phá bộ sưu tập nội thất decor hiện đại và tiện nghi tại H&H Decor. Mua sắm trực tuyến với nhiều ưu đãi hấp dẫn.',
  icons: {
    icon: '/icon/favicon.ico', // favicon
    shortcut: '/icon/favicon.ico',
    apple: '/icon/apple-touch-icon.png',
  },
  openGraph: {
    title: 'H&H Decor - Cửa hàng đồ trang trí trực tuyến',
    description:
      'Khám phá bộ sưu tập nội thất decor hiện đại và tiện nghi tại H&H Decor. Mua sắm trực tuyến với nhiều ưu đãi hấp dẫn.',
    url: 'https://hnhdecor.com',
    siteName: 'H&H Decor',
    images: [
      {
        url: '/icon/thumb.jpg', // ảnh thumbnail hiển thị khi share
        width: 1200,
        height: 630,
        alt: 'H&H Decor',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'H&H Decor - Cửa hàng đồ trang trí trực tuyến',
    description:
      'Khám phá bộ sưu tập nội thất decor hiện đại và tiện nghi tại H&H Decor.',
    images: ['/icon/thumb.jpg'], // thumbnail cho Twitter
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <CartProvider>{children}</CartProvider>

        {/* Nút liên hệ nổi */}
        <FloatingContactButton />
      </body>
    </html>
  );
}
