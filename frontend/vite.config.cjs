const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react').default;
const history = require('connect-history-api-fallback');

module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    middlewareMode: false,
    configureServer: (server) => {
      server.middlewares.use(history());
    },
  },
});
