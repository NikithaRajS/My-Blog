const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// To create the structure of the document

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
//Blog is imp since it will look for blogs in the database singular of collection name
module.exports = Blog;