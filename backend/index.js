const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Config/db");
const router = require("./routes");

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json())

app.use("/api",router)

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT,() => {
    console.log("connect to db");

    console.log("server is running",+PORT);
  });
});
