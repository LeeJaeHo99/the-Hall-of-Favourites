import type { Metadata } from "next";
import "@/styles/css/style.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
    title: "최애의 전당",
    description: "당신의 최애를 우승시켜라!",
    openGraph: {
        title: "최애의 전당",
        description: "당신의 최애를 우승시켜라!",
        url: "https://your-domain.com/about",
        siteName: "최애의 전당",
        images: [
            {
                url: "https://your-domain.com/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "최애의 전당",
        description: "당신의 최애를 우승시켜라!",
        images: ["https://your-domain.com/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
