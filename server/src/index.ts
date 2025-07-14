import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your React app's origin
    credentials: true, // If you need cookies/auth
  })
);
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
