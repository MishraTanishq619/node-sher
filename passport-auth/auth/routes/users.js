const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose
	.connect("mongodb://127.0.0.1:27017/PassportAuth")
	.then(() => console.log("DB Connected"));

const schema = new mongoose.Schema({
	username: String,
	password: String,
	secret: String,
});
schema.plugin(plm);
const Users = mongoose.model("Users", schema);

module.exports = Users;
