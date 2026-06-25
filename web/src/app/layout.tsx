import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/AppLayout";

export const metadata: Metadata = {
  title: "SoundWave — Nghe nhạc không giới hạn",
  description:
    "SoundWave: ứng dụng nghe nhạc trực tuyến miễn phí. Khám phá hàng triệu bài hát, tạo playlist cá nhân, theo dõi nghệ sĩ yêu thích.",
  keywords: "nghe nhạc, music streaming, playlist, SoundWave",
  openGraph: {
    title: "SoundWave",
    description: "Nghe nhạc không giới hạn",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="h-screen flex flex-col overflow-hidden bg-black text-white antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
