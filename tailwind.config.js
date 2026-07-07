/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map primary (Saffron)
        indigo: {
          50: '#fffdfa',
          100: '#fff3e5',
          200: '#ffe0bd',
          300: '#ffc68f',
          400: '#ffaa5c',
          500: '#FF9933', // Saffron Primary
          600: '#e58023',
          700: '#b25e14',
          800: '#8c4509',
          900: '#5e2e03',
          950: '#331700',
        },
        // Map orange highlights to Saffron as well
        orange: {
          50: '#fffdfa',
          100: '#fff3e5',
          200: '#ffe0bd',
          300: '#ffc68f',
          400: '#ffaa5c',
          500: '#FF9933', // Saffron
          600: '#e58023',
          700: '#b25e14',
          800: '#8c4509',
          900: '#5e2e03',
          950: '#331700',
        },
        // Map secondary (India Green)
        emerald: {
          50: '#f0fbf0',
          100: '#d9f5d9',
          200: '#b2ebb2',
          300: '#80dd80',
          400: '#4dcc4d',
          500: '#138808', // India Green Secondary
          600: '#0f6e06',
          700: '#0b5204',
          800: '#073a03',
          900: '#052702',
          950: '#021201',
        },
        // Map purple to Accent (Navy Blue)
        purple: {
          50: '#f2f2ff',
          100: '#e6e6ff',
          200: '#ccccff',
          300: '#9999ff',
          400: '#6666ff',
          500: '#000080', // Navy Blue Accent
          600: '#000073',
          700: '#00005a',
          800: '#000040',
          900: '#00002b',
          950: '#000014',
        },
        // Map background dark colors to Light Neutrals
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#000080', // Accent Navy
          600: '#000073',
          750: '#e2e8f0',
          800: '#ffffff', // Neutral White
          850: '#f1f5f9', // Neutral Light Gray
          900: '#ffffff', // Neutral White
          950: '#f8fafc', // Neutral Off-white page bg
        },
        // Invert slate colors for light-mode readability (slate-100 in code -> dark text)
        slate: {
          50: '#0f172a',
          100: '#1e293b', // dark gray text
          200: '#334155', // dark gray text
          300: '#475569',
          400: '#64748b', // medium gray text
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#cbd5e1', // soft border
          800: '#ffffff', // card white background
          850: '#f8fafc', // card off-white background
          900: '#ffffff', // card container background
          950: '#f8fafc', // page off-white background
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
