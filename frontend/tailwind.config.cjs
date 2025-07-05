module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xsm: '700px', // 👈 Your custom breakpoint
      },
    },
  },
  plugins: [],
}
