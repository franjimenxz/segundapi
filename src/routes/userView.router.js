import { Router } from "express";

const router = Router();

router.get("/login", async (req, res) => {
    res.render("login", {
        title: "Login",
        style: "styles.css",
    });
});

router.get("/register", async (req, res) => {
    res.render("register", {
        title: "Register",
        style: "index.css",
    });
});

export default router;
