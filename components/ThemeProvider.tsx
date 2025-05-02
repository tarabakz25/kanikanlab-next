'use client'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

type ThemeProviderProps = {
  children: ReactNode;
  [key: string]: any;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}   