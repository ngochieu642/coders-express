const express = require("express");
const router = express.Router();
const controller = require("../controller/users");

router.get("/create", controller.getCreate);
router.get("/:id", controller.getItemById);
router.get("/", controller.root);
router.get("/:id/delete", controller.getDeleteById);
router.post("/:id/update", controller.postUpdateById);
router.post("/create", controller.postCreate);

module.exports = router;
