/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'primary-blue': 'var(--primary-blue)',
          'secondary-blue': 'var(--secondary-blue)',
          'accent-blue': 'var(--accent-blue)',
        },
      },
    },
    plugins: [],
  };