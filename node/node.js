// browsers blocks requests from "file://" for security. run "npm i" from root dir for dependencies.
// "node node/node.js" to run locally and go to localhost:3000 in browser for testing
const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the directory
app.use(express.static(__dirname + "/.."));

app.get('/', function(req, res) {
  res.sendFile("/index.html", { root: '.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
