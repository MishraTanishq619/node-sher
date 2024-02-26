var express = require("express");
const passport = require("passport");
var router = express.Router();

//
const userModel = require("./users");
var localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

//

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/");
};

/* GET home page. */
router.get("/", function (req, res) {
	res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.get("/register", (req, res) => {
	res.render("register");
});

router.get("/profile", isLoggedIn, (req, res) => {
	res.render("main");
});

router.post("/register", (req, res) => {
	let userdata = new userModel({
		username: req.body.username,
		secret: req.body.secret,
	});

	userModel.register(userdata, req.body.password).then((registeredUser) => {
		passport.authenticate("local")(req, res, () => {
			res.redirect("/login");
		});
	});
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/profile",
		failureRedirect: "/",
	}),
	(req, res) => {}
);

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});
});

router.all("*", (req, res) => {
	res.render("error");
});

module.exports = router;
