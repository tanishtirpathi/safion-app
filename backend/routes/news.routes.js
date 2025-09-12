const express = require("express");
const { getNewsByLocation } = require("../controllers/news.controller");

const router = express.Router();

router.get("/", getNewsByLocation);

module.exports = router;   // ✅ CommonJS export
