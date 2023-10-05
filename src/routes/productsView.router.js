import { Router } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import {passportCall} from "../util/authUtil.js";
import ProductDBService from "../services/ProductDBService.js";

const router = Router();

router.get("/",auth,async (req, res) => {
  try {
    const productDBService = new ProductDBService();
    const response = await productDBService.getAllProducts();
    let products = response.map((product) => {
        return {
            ...product._doc,
          prevLink: product._doc.prevLink
              ? product._doc.prevLink.replace(
                  "http://localhost:8080/api",
                  "http://localhost:8080",
              )
              : product._doc.prevLink,
          nextLink: product._doc.nextLink
              ? product._doc.nextLink.replace(
                  "http://localhost:8080/api",
                  "http://localhost:8080",
              )
              : product._doc.nextLink,
        };
    });
    console.log(products);
    if(!req.user) {
      res.redirect("/login")
    }
    res.render("products", {
      user: req.user,
      rol: req.user.role === "admin",
      products: products,
      title: "Productos",
      style: "styles.css",
    });
  } catch (error) {
    console.log(error);
  }
});

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({
      message: 'Not authenticated'
    });
  }
  const token = authHeader.split(' ')[1]; //Remove "Bearer"
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (error, credentiales) => {
    if (error) {
      return res.status(403).send({
        message: 'Not authenticated'
      });
    }
    req.user = credentiales;
    console.log(req.user);
    next();
  });
}

export default router;
