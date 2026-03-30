import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solar System Explorer',
  description: 'Khám phá hệ mặt trời tương tác',
  icons: {
    icon: '/logo-02.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
