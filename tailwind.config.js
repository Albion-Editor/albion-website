/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#070C18',
        'surface': '#0F172A',
        'surface-raised': '#141E33',
        'hairline': 'rgba(148, 163, 184, 0.16)',
        'text-main': '#E6ECF5',
        'muted': '#8EA0B8',
        'brand-blue': '#2F6FED',
        'blue-500': '#2F6FED',
        'blue-400': '#5A9BFF',
        'gold-500': '#F5B700',
        'gold-400': '#FFCB3D',
        'navy-ink': '#0F172A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        control: '6px',
        panel: '10px',
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        'pulse-slow': 'pulseGlow 12s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
