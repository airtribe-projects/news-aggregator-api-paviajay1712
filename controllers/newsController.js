const axios = require("axios");
const User = require("../models/user");
const Article = require('../models/article');

exports.getNews = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${user.preferences.country}&category=${user.preferences.category}&apiKey=${process.env.NEWS_API_KEY}`;
    console.log(newsApiUrl);
    try {
      const response = await axios.get(newsApiUrl);
      console.log(response.data);
      await Article.insertMany(response.data.articles);
      res.json(response.data.articles);
    } catch (apiError) {
      console.error(
        "News API Error:",
        apiError.response ? apiError.response.data : apiError.message
      );
      return res.status(503).json({
        message: "Unable to fetch news at the moment. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    next(error);
  }
};

exports.markArticleAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(
      id,
      { $addToSet: { readBy: req.userId } },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article marked as read", article });
  } catch (error) {
    console.error("Server Error:", error);
    next(error);
  }
};

exports.markArticleAsFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(
      id,
      { $addToSet: { favoritedBy: req.userId } },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article marked as favorite", article });
  } catch (error) {
    console.error("Server Error:", error);
    next(error);
  }
};

exports.getReadArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ readBy: req.userId });
    res.json(articles);
  } catch (error) {
    console.error("Server Error:", error);
    next(error);
  }
};

exports.getFavoriteArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ favoritedBy: req.userId });
    res.json(articles);
  } catch (error) {
    console.error("Server Error:", error);
    next(error);
  }
};

exports.searchArticles = async (req, res, next) => {
  try {
    console.log("Searching for articles...", req.params);
    const { keyword } = req.params;
    const articles = await Article.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(articles);
  } catch (error) {
    console.error("Server Error:", error);
    next(error);
  }
};
