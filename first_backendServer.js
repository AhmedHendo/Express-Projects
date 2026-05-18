import express from 'express'; // Import the Express library to create a web server
import path from 'path'; // Import the path module to work with file and directory paths
import posts from './routes/posts.js'; // Import the posts routes from the specified file
import logger from './middleware/logger.js'; // Import the logger middleware from the specified file
import errorHandler from './middleware/error.js'; // Import the error handling middleware from the specified file
import notFound from './middleware/notFound.js'; // Import the not found middleware from the specified file

const port = process.env.PORT || 3000; // Set the port to the value from the environment variable PORT or default to 3000
const app = express(); // Create an instance of the Express application (server)

// Body parser middleware to parse JSON request bodies
app.use(express.json()); // Use the built-in middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Use the built-in middleware to parse URL-encoded request bodies

// Logger middleware to log incoming requests
app.use(logger); // Use the logger middleware for all incoming requests

app.use('/api/posts', posts); // Use the imported posts routes for any requests that start with "/api/posts"

//Error Handler
app.use(notFound); // Use the not found middleware for any requests that do not match any routes
app.use(errorHandler); // Use the error handling middleware for any errors that occur in the routes

app.get("/", (req, res) => { // Register a route for the root URL ("/") "HomePage" that listens for GET requests
  res.send("Hello World");
});

app.listen(port, () => console.log(`Server is running on port ${port}`)); // Start the server and have it listen on the specified port for incoming requests