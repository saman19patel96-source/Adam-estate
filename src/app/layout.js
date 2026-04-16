import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Adam Estate — Hyper-Luxury Real Estate",
  description:
    "Discover the world's most exclusive properties. Adam Estate curates extraordinary residences for distinguished clientele seeking the pinnacle of luxury living.",
  keywords: "luxury real estate, premium properties, exclusive homes, Adam Estate",
  openGraph: {
    title: "Adam Estate — Hyper-Luxury Real Estate",
    description:
      "Discover the world's most exclusive properties curated for distinguished clientele.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1a1a2e",
              color: "#f5f0e8",
              border: "1px solid rgba(201, 169, 110, 0.2)",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "#c9a96e",
                secondary: "#0a0a0a",
              },
            },
            error: {
              iconTheme: {
                primary: "#fc8181",
                secondary: "#0a0a0a",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
