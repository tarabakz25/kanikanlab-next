import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        animation: {
            'text-underline': 'text-underline position-absolute left-0 bottom-2 w-full h-1 bg-black transition-all duration-300 ease-in-out',
        },
        keyframes: {
            'text-underline': {
                '0%': {
                    transform: 'scaleX(0)',
                },
                '100%': {
                    transform: 'scaleX(1)',
                },
            },
        },
        fontFamily: {
            sans: ['krok', 'sans-serif'],
            mono: ['anonymous-pro', 'monospace'],
        },
    }
  },
  plugins: [],
}

export default config