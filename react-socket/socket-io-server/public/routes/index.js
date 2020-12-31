const express = require("express");
const router = express.Router();

/**
 * split up express routes into seperate js files
 */

// default route
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;
