// app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext'; // import CartProvider

export const metadata: Metadata = {
  title: 'H&H Decor - Cửa hàng đồ trang trí trực tuyến',
  description: 'Khám phá bộ sưu tập nội thất decor hiện đại và tiện nghi tại H&H Decor. Mua sắm trực tuyến với nhiều ưu đãi hấp dẫn.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Thêm Google Fonts qua link CDN */}
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
