const express = require("express");
const router = express.Router();
const db = require("../db");
const {
  findItemById,
  renderAllItems,
  deleteById,
  updateItemById,
  addItem,
} = db;

router.get("/create", (req, res) => {
  res.render("admin-transaction", {
    books: db.get("books").value(),
    users: db.get("users").value(),
  });
});

router.get("/:id", (req, res) => {
  let itemId = req.params.id;
  let foundItem = findItemById("transactions", itemId);
  res.render("transaction", {
    user: foundItem,
  });
});

router.get("/", (req, res) => {
  renderAllItems("transactions", req, res);
});

router.get("/:id/delete", (req, res) => {
  let toDeleteId = req.params.id;
  deleteById("transactions", toDeleteId);
  res.redirect("/transactions");
});

router.post("/:id/update", (req, res) => {
  let toUpdateId = req.params.id;
  updateItemById("transactions", toUpdateId, req.body);
  res.redirect("/transactions");
});

router.post("/create", (req, res) => {
  addItem("transactions", req.body);
  res.redirect("/transactions");
});

module.exports = router;
