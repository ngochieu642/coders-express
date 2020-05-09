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
  let foundItem = findItemById("users", itemId);
  res.render("user", {
    user: foundItem,
  });
});

router.get("/", (req, res) => {
  renderAllItems("users", req, res);
});

router.get("/:id/delete", (req, res) => {
  let toDeleteId = req.params.id;
  deleteById("users", toDeleteId);
  res.redirect("/users");
});

router.post("/:id/update", (req, res) => {
  let toUpdateId = req.params.id;
  updateItemById("users", toUpdateId, req.body);
  res.redirect("/users");
});

router.post("/create", (req, res) => {
  addItem("users", req.body);
  res.redirect("/users");
});

module.exports = router;
