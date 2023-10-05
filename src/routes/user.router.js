import { Router } from "express";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { compareHash } from "../util/cryptoUtil.js";

const router = Router();

router.get("/",async (req, res) => {
  res.send("Hola mundo");
});
router.post("/register", async (req, res) => {
  try {
    const result = await userModel.create(req.body);

    res.status(200).send({
      status: "User created successfully",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error while creating user",
      payload: error,
    });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userModel.findOne({ email });
    let user = {
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      age: result.age,
    };
    if (!result) {
      throw new Error("Login failed");
    }

    if (!compareHash(password, result.password)) {
      throw new Error("Login failed");
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    }).send({
      status: "User logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error while logging in user",
      payload: error,
    });
  }
});
export default router;
