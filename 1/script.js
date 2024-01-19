// // 1
// var oneLinerJoke = require("one-liner-joke");

// var getRandomJoke = oneLinerJoke.getRandomJoke();
// console.log(getRandomJoke.body);

// console.log(typeof getRandomJoke);

// var getRandomJoke = oneLinerJoke.getRandomJokeWithTag("IT", {
// 	exclude_tags: ["dirty", "racist", "marriage"],
// });
// console.log(getRandomJoke);

// // 2

// var figlet = require("figlet");

// var fr = "";
// figlet("This is Tanishq!!", function (err, data) {
// 	if (err) {
// 		console.log("Something went wrong...");
// 		console.dir(err);
// 		return;
// 	}
// 	console.log(data);
// 	fr = data;
// });

// 3

const express = require("express");
const app = express();

app.set("view engine", "ejs");

var a = 12;
var b = 42;

// Middleware...
app.use(function (req, res, next) {
	console.log(a, b);
	next(); // push to come out of middleware (or route)
});

app.use(express.static("./public"));

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.get("/contacts", function (req, res) {
	res.send("This is contacts.");
});

app.get("/hello", (req, res) => {
	res.send("Hello 2..");
});

app.get("/frid", function (req, res) {
	console.log("fridget");
	res.send("Got jfguyefeyiaiuwfhwaohwoafhiwaf");
});

// dynamic routing

app.get("/profile", (req, res) => {
	res.send("Hello Profile");
});

app.get("/error", (req, res) => {
	throw Error("error");
});

app.get("/profile/:uname", (req, res) => {
	res.send(`Hello Profile ${req.params.uname} .`);
});

// ejs - html with superpowers

// 1.install ejs
// 2.app.set("view engine","ejs")
//  ---1. views folder banao
//  ---2. filename.ejs banao
// 3.route pe - response.render("filename") (without .ejs)

//     ************ RESPONSE WILL RENDR or SEND ************

app.get("/ejs", (req, res) => {
	res.render("index", { name: "Halelula" });
});

// error handling ..

app.use(function errorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500);
	res.render("error", { error: err });
});

app.listen(3000); // local host
