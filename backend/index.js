const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Config/db");
const router = require("./routes");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://ecommerce-mu-eight-74.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
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
