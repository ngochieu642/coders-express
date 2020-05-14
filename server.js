// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { countCookie } = require("./middleware/cookie");
const { requireAuth } = require("./middleware/auth");

const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const transactionRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", countCookie, requireAuth, userRoutes);
app.use("/books", countCookie, requireAuth, bookRoutes);
app.use("/transactions", countCookie, requireAuth, transactionRoutes);
app.use("/auth", countCookie, authRoutes);

// Render
app.get("/", countCookie, (request, response) => {
  response.cookie("username", "hieuthai642");
  response.send("I love CodersX");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
