const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");


dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

// MiddleWare Error Hanlder
// app.use(notFound)
// app.use(errorHandler)

app.get("/", (req, res) => {
  res.send("API Running!");
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes)

// server Running Port
const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(`server start on ${PORT}`))