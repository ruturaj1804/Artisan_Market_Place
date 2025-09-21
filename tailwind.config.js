/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // warm neutral
        input: "var(--color-input)", // subtle cream
        ring: "var(--color-ring)", // terracotta warmth
        background: "var(--color-background)", // warm off-white
        foreground: "var(--color-foreground)", // deep brown
        primary: {
          DEFAULT: "var(--color-primary)", // terracotta warmth
          foreground: "var(--color-primary-foreground)", // warm off-white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // rich earth brown
          foreground: "var(--color-secondary-foreground)", // warm off-white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // muted red-brown
          foreground: "var(--color-destructive-foreground)", // warm off-white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // subtle cream
          foreground: "var(--color-muted-foreground)", // medium brown
        },
        accent: {
          DEFAULT: "var(--color-accent)", // golden beige
          foreground: "var(--color-accent-foreground)", // deep brown
        },
        popover: {
          DEFAULT: "var(--color-popover)", // warm off-white
          foreground: "var(--color-popover-foreground)", // deep brown
        },
        card: {
          DEFAULT: "var(--color-card)", // subtle cream
          foreground: "var(--color-card-foreground)", // deep brown
        },
        success: {
          DEFAULT: "var(--color-success)", // sage green
          foreground: "var(--color-success-foreground)", // warm off-white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // turmeric yellow
          foreground: "var(--color-warning-foreground)", // deep brown
        },
        error: {
          DEFAULT: "var(--color-error)", // muted red-brown
          foreground: "var(--color-error-foreground)", // warm off-white
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        caption: ['Source Sans Pro', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'warm-sm': '0 2px 4px rgba(193, 123, 90, 0.15)',
        'warm': '0 4px 12px rgba(193, 123, 90, 0.15)',
        'warm-lg': '0 8px 24px rgba(193, 123, 90, 0.15)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        'cultural': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}