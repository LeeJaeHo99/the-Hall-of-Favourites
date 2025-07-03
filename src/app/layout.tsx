import type { Metadata } from "next";
import "@/styles/style.scss";
import Header from "@/components/ui/Header";
// import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
    title: "최애의 전당",
    description:
        "나의 최애를 1등으로!",
    authors: [{ name: "이재호", url: "https://www.myidolranking.com" }],
    creator: "이재호",
    publisher: "이재호",
    openGraph: {
        type: "website",
        siteName: "최애의 전당",
        locale: "ko_KR",
        title: "최애의 전당",
        description:
            "나의 최애를 1등으로!",
        url: "https://www.myidolranking.com",
        images: [
            {
                url: "/images/bg.png",
                width: 1200,
                height: 630,
                alt: "최애의 전당",
            },
        ],
    },
    icons: {
        icon: "/icons/favicon.ico",
        shortcut: "/icons/favicon.ico",
        apple: "/icons/favicon.ico",
    },
    themeColor: "#ffffff",
    twitter: {
        card: "summary_large_image",
        title: "최애의 전당",
        description: "나의 최애를 1등으로!",
        images: ["/images/bg.png"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        },
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
                {/* <Footer /> */}
            </body>
        </html>
    );
}
