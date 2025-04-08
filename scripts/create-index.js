const fs = require('fs');
const path = require('path');

// Path to the dist directory
const distDir = path.join(__dirname, '..', 'dist');

// Check if daily-cards.html exists and copy it as index.html
if (fs.existsSync(path.join(distDir, 'daily-cards.html'))) {
  // Copy the daily-cards.html file to index.html
  const dailyCardsContent = fs.readFileSync(path.join(distDir, 'daily-cards.html'), 'utf8');
  fs.writeFileSync(path.join(distDir, 'index.html'), dailyCardsContent);
  console.log('Copied daily-cards.html to index.html');
} else {
  // Create a simple index.html that loads the Expo app properly
  const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cartomancy App</title>
  <script>
    // Load the app directly
    window.location.replace('/_expo/static/js/web/entry-2f1e5794d85cf7e81c55a9fc59456601.js');
  </script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
      background-color: #f7f7f7;
      color: #333;
    }
    p {
      margin: 10px 0;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Loading Cartomancy App...</h1>
  <p>If the app doesn't load automatically, please check your connection and try again.</p>
</body>
</html>`;

  // Write the index.html file
  fs.writeFileSync(path.join(distDir, 'index.html'), indexContent);
  console.log('Created index.html file in dist directory');
}

// Also create a 404.html that redirects to index.html
const notFoundContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cartomancy App</title>
  <script>
    // Redirect to the root
    window.location.replace('/');
  </script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
      background-color: #f7f7f7;
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Redirecting...</h1>
</body>
</html>`;

// Write the 404.html file
fs.writeFileSync(path.join(distDir, '404.html'), notFoundContent);
console.log('Created 404.html file in dist directory');
