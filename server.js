import express from "express";
import { fileURLToPath } from "url";
import path from "path";

// Define the the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
// Set EJS as the templating engine
app.set("view engine", "ejs");

// Tell Express where to find your templates
app.set("views", path.join(__dirname, "src/views"));

// app.get("/", (req, res) => {
//   res.send("Hello from Express!");
// });

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/organizations.html", (req, res) => {
  res.render("organizations");
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/projects.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log(__filename);
  console.log(__dirname);
  console.log(path.join(__dirname, "src/views/home.html"));
});
