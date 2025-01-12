const mongoose = require("mongoose");

const martinschema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  content: {
    type: String,
    required:true
  },
  authorname: {
    type: String,
    required:true
  },
  date: {
    type: String,
    required:true
  },
  tags: {
    type: String,
    required:true
  },
});
const addpost = mongoose.model("addpost", martinschema);
module.exports = addpost;
