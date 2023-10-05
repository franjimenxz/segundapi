import { Router } from "express";
import passport from "passport";
import { passportCall } from "../util/authUtil.js";

const router = Router();

router.get("/current", passportCall("jwt"), (req, res) => {
  res.status(200).send({
    status: "ok",
    payload: req.user,
  });
});

router.get("/failLogin", (req, res) => {
  res.status(401).send({
    status: "Login failed",
  });
});

export default router;