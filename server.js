// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");

db = low(adapter);
db.defaults({ todos: [] }).write();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Render
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/admin-todo", (req, res) => {
  res.render("admin-todo");
});

app.get("/todos/:id/delete", (req, res) => {
  let toDeleteId = req.params.id;
  deleteById(toDeleteId);
  res.redirect("/todos");
});

app.get("/todos/:id", (req, res) => {
  let todoId = req.params.id;
  let foundItem = findItemById(todoId);
  res.render("todo", {
    todo: foundItem,
  });
});

app.get("/todos", (req, res) => {
  console.log(req.query);
  let allJobs = db.get("todos").value();
  let findName = req.query.q;
  if (!findName) {
    res.render("todos", {
      todos: allJobs,
    });
  } else {
    let foundItems = allJobs.filter(function (action) {
      return action.text.toLowerCase().includes(findName);
    });

    res.render("todos", {
      todos: foundItems,
    });
  }
});

// App logic
app.post("/todos/create", (req, res) => {
  let { todo } = req.body;
  updateTodos(todo);
  res.redirect("/todos");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

// Model function
const updateTodos = (action) => {
  let id = Date.now();
  let actionData = { id: id, text: action };
  !!action && db.get("todos").push(actionData).write();
};

const findItemById = (itemId) => {
  return db
    .get("todos")
    .find({ id: +itemId })
    .value();
};

const deleteById = (itemId) => {
  db.get("todos").remove({ id: +itemId }).write();
};
