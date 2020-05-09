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

router.get("/:id", (req, res) => {
  let itemId = req.params.id;
  let foundItem = findItemById("books", itemId);
  res.render("book", {
    book: foundItem,
  });
});

router.get("/", (req, res) => {
  renderAllItems("books", req, res);
});

router.get("/:id/delete", (req, res) => {
  let toDeleteId = req.params.id;
  deleteById("books", toDeleteId);
  res.redirect("/books");
});

router.post("/:id/update", (req, res) => {
  let toUpdateId = req.params.id;
  updateItemById("books", toUpdateId, req.body);
  res.redirect("/books");
});

router.post("/create", (req, res) => {
  addItem("books", req.body);
  res.redirect("/books");
});

module.exports = router;
