import React from 'react';
import {TRPCReactProvider } from '~/trpc/react';
import { ThemeProvider as NextThemesProvider } from "next-themes"


const Providers = (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    return (
        <>
            <TRPCReactProvider>
            <NextThemesProvider
                attribute={'class'}
                defaultTheme={"system"}
                enableSystem
                disableTransitionOnChange
            >{children}
            </NextThemesProvider>
            </TRPCReactProvider>
        </>
    );
};

export default Providers;