/** @type {import('tailwindcss').Config} */
const gridConfig = () => {
  const gridColumnStart = {}
  const gridColumnEnd = {}
  const gridTemplateColumns = { '28': 'repeat(28, minmax(0, 1fr))' }

  for (let i = 14; i <= 29; i++) {
    gridColumnStart[i.toString()] = i.toString()
    gridColumnEnd[i.toString()] = i.toString()
  }

  return { gridTemplateColumns, gridColumnStart, gridColumnEnd }
}

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      ...gridConfig(),
      minHeight: (theme) => ({
        ...theme('spacing')
      }),
      minWidth: {
        '1000': '1000px'
      },
    },
  },
  plugins: [],
}
