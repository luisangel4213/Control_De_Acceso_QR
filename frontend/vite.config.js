/** @type {import('vite').UserConfig} */
module.exports = {
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
};
