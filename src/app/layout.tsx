import { Architects_Daughter } from "next/font/google";
import { env } from "~/env";

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
  const isDev = env.NODE_ENV === "development";
  return (
    <>
      <html lang="en" className={`${font.variable}`} suppressHydrationWarning>
        <body className={"relative flex min-h-screen flex-col"}>
          {children}

          {/* Debug / Breakpoint indicator */}
          {isDev && (
            <div className="pointer-events-none fixed top-2 right-2 z-50 rounded bg-white/80 px-2 py-1 font-mono text-xs text-black shadow">
              <span className="block sm:hidden">xs</span>
              <span className="hidden sm:block md:hidden">sm</span>
              <span className="hidden md:block lg:hidden">md</span>
              <span className="hidden lg:block xl:hidden">lg</span>
              <span className="hidden xl:block 2xl:hidden">xl</span>
              <span className="hidden 2xl:block">2xl</span>
            </div>
          )}
        </body>
      </html>
    </>
  );
}
