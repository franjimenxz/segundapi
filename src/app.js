import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import initPassport from "./config/passport.config.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsViewRouter from "./routes/productsView.router.js";
import cartsViewRouter from "./routes/cartsView.router.js";
import userViewRouter from "./routes/userView.router.js";
import sessionRouter from "./routes/session.router.js";
import userRouter from "./routes/user.router.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
initPassport();
app.use(passport.initialize());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

try{
  const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB}`;
  await mongoose.connect(db);
  console.log("Database connected");
}catch (error){
    console.log(error);
}

app.use("/", userViewRouter);
app.use("/api/sessions", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", productsViewRouter);
app.use("/carts", cartsViewRouter);
const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
