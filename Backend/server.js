const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/profiles", (req, res) => {
  res.json(profiles);
});

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
