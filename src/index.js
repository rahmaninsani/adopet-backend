const app = require('./app');
const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log('Main index.js: ', err);
}
