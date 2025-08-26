const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());

// ✅ CORS setup (no trailing slash!)
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite default
    'http://localhost:3000', // React default
    'https://bookstore-client-mern.netlify.app' // Deployed frontend
  ],
  credentials: true
}));

// ✅ Routes
const bookRoutes = require('./src/books/book.route');
// If you add user/auth routes later:
// const userRoutes = require('./src/users/user.route');

app.use("/api/books", bookRoutes);
// app.use("/api/users", userRoutes);

// ✅ Database & server startup
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected successfully!");

    // Default route (health check)
    app.get('/', (_req, res) => {
      res.send("📚 Book store server is running...");
    });

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
}

main();
