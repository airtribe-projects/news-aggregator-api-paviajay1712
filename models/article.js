const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  urlToImage: { type: String },
  publishedAt: { type: Date, required: true },
  source: {
    id: { type: String },
    name: { type: String },
  },
  category: { type: String },
  country: { type: String },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
