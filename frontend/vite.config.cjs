const { defineConfig } = require('./node_modules/vite/dist/node');
const react = require('./node_modules/@vitejs/plugin-react/dist/index.d.mts');

module.exports = defineConfig({
  plugins: [react()],
  server:{port:5173}
});
