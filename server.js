// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

const allJobs = ["Đi chợ", "Nấu cơm", "Rửa bát", "Học code tại CodersX"];

app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/search-product", (req, res)=>{
  res.render('search-product')
})

app.get("/todos", (req, res) => {
  console.log(req.query);
  let findName = req.query.q;
  if (!findName) {
    res.render("todo", {
      jobs: allJobs,
    });
  } else {
    let foundItems = allJobs.filter(function (action) {
      return action.toLowerCase().includes(findName);
    });

    res.render("todo", {
      jobs: foundItems,
    });
  }
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
