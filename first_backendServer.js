import express from 'express'; // Import the Express library to create a web server
import path from 'path'; // Import the path module to work with file and directory paths
import { fileURLToPath } from 'url'; // Import the fileURLToPath function to convert a file URL to a path
import posts from './routes/posts.js'; // Import the posts routes from the specified file
import users from './routes/users.js'; // Import the users routes from the specified file
import auth from './routes/auth.js'; // Import the authentication routes from the specified file
import logger from './middleware/logger.js'; // Import the logger middleware from the specified file
import errorHandler from './middleware/error.js'; // Import the error handling middleware from the specified file
import notFound from './middleware/notFound.js'; // Import the not found middleware from the specified file
import dotenv from 'dotenv'; // Import the dotenv library to load environment variables from a .env file
import cors from'cors'; // Import the cors library to enable Cross-Origin Resource Sharing (CORS) for the server
import cookieParser from 'cookie-parser'; // Import the cookie-parser library to parse cookies in incoming requests

dotenv.config(); // Load environment variables from the .env file into process.env

const port = process.env.PORT || 3000; // Set the port to the value from the environment variable PORT or default to 3000

// Get the directory name
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory name of the current file

const app = express(); // Create an instance of the Express application (server)

const corsOptions = {credentials: true, origin: process.env.URL}; // Define CORS options to allow requests from the specified origin and include credentials

// Body parser middleware to parse JSON request bodies
app.use(express.json()); // Use the built-in middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Use the built-in middleware to parse URL-encoded request bodies

app.use(cors(corsOptions)); // Use the CORS middleware with the defined options to enable CORS for incoming requests
app.use(cookieParser()); // Use the cookie-parser middleware to parse cookies in incoming requests

// Logger middleware to log incoming requests
app.use(logger); // Use the logger middleware for all incoming requests

// Setup static folder to serve static files (like images, CSS, JavaScript) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/posts', posts); // Use the imported posts routes for any requests that start with "/api/posts"
app.use('/api/users', users); // Use the imported users routes for any requests that start with "/api/users"
app.use('/api/auth', auth); // Use the imported authentication routes for any requests that start with "/api/auth"

app.get("/", (req, res) => { // Register a route for the root URL ("/") "HomePage" that listens for GET requests
  res.send("Hello World");
});

//Error Handler
app.use(notFound); // Use the not found middleware for any requests that do not match any routes
app.use(errorHandler); // Use the error handling middleware for any errors that occur in the routes

app.listen(port, () => console.log(`Server is running on port ${port}`)); // Start the server and have it listen on the specified port for incoming requests