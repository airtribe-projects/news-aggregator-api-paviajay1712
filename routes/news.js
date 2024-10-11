const express = require("express");
const {
  getNews,
  markArticleAsRead,
  markArticleAsFavorite,
  getReadArticles,
  getFavoriteArticles,
  searchArticles,
} = require("../controllers/newsController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, getNews);
router.post("/:id/read", authenticate, markArticleAsRead);
router.post("/:id/favorite", authenticate, markArticleAsFavorite);
router.get("/read", authenticate, getReadArticles);
router.get("/favorites", authenticate, getFavoriteArticles);
router.get("/search/:keyword", authenticate, searchArticles);

module.exports = router;
