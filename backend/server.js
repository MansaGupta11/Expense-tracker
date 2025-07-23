require("dotenv").config();
const express = require("express");     
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db"); // Import the database connection function
const authRoutes = require("./routes/authRoutes"); // Import authentication routes
const incomeRoutes = require("./routes/incomeRoutes"); // Import income routes
const expenseRoutes = require("./routes/expenseRoutes"); // Import expense routes
const dashboardRoutes = require("./routes/dashboardRoutes"); // Import dashboard routes

const app= express();
//connect to mongoDB
connectDB();

//middleware to handle cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],  
        allowedHeaders: ["Content-Type", "Authorization"],
})
);

app.use(express.json()); //middleware to parse json data

//api routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default route for `/`
app.get("/", (req, res) => {
  res.send(`
    <h1>🎉 Expense Tracker Backend is Running!</h1>
    <p>Available API endpoints:</p>
    <ul>
      <li>/api/v1/auth</li>
      <li>/api/v1/income</li>
      <li>/api/v1/expense</li>
      <li>/api/v1/dashboard</li>
    </ul>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));