const express = require("express"); // Import the Express library to create a web server
const app = express(); // Create an instance of the Express application (server)

app.get("/", (req, res) => { // Register a route for the root URL ("/") "HomePage" that listens for GET requests
  res.send("Hello World");
});

app.listen(3000); // Start the server and have it listen on port 3000 for incoming requests