import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/global-components/navigation";
import Footer from "../components/global-components/footer";
import { Merriweather } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://wordle.tylerlatshaw.com/"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | Wordle Analyzer",
    default: "Wordle Word Analyzer",
  },
  description: "Crush your Wordle game! Enter your guesses and get smart word suggestions to solve the puzzle faster with Wordle Word Analyzer.",
  generator: "Next.js",
  applicationName: "Next.js",
  keywords: ["Next.js", "React", "JavaScript"],
  authors: [{ name: "Tyler Latshaw", url: "https://tylerlatshaw.com/" }],
  creator: "Tyler J. Latshaw",
  publisher: "Tyler J. Latshaw",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      { rel: "mask-icon", url: "/favicon/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "manifest", url: "/favicon/site.webmanifest" },
      { rel: "msapplication-config", url: "/favicon/browserconfig.xml" },
    ],
  },

};

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={merriweather.className}>
      <head>
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className="leading-normal tracking-normal bg-cover bg-fixed min-h-screen" suppressHydrationWarning={true}>
        <main>
          <Navigation />
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html >
  );
}