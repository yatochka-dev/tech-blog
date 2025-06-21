import React from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TRPCReactProvider>
        <NextThemesProvider
          attribute={"class"}
          defaultTheme={"system"}
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
        </NextThemesProvider>
      </TRPCReactProvider>
    </>
  );
};

export default Providers;
