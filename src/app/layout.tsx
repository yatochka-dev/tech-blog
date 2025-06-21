import { Architects_Daughter } from "next/font/google";

const font = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400"],
});

export default function RootELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={`${font.variable}`} suppressHydrationWarning>
        <body className={"flex min-h-screen flex-col"}>{children}</body>
      </html>
    </>
  );
}
