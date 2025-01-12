const mongoose = require("mongoose");
const addpost = require("../Models/PostSchema");

exports.addingpost = async (req, res) => {
    console.log("inside addpost api");
    
  const { title, content, authorname, date, tags } = req.body;
  try {
    const post = await addpost.findOne({ title });
    if (post) {
      return res.status(400).json("blog already exist ");
    } else {
      const newpost = new addpost({
        title,
        content,
        authorname,
        date,
        tags,
      });
      await newpost.save();
      return res.status(200).json(newpost);
    }
  } catch (e) {
    res.status(401).json(e);
  }
};

exports.getpost = async (req, res) => {
  console.log("inside getpost api");

  try {
    const getpost = await addpost.find();
    if (!getpost) {
      return res.status(400).json("no courses found");
    } else {
      return res.status(200).json(getpost);
    }
  } catch (e) {
    return res.status(401).json("error in fetching");
  }
};

exports.deletepost = async (req, res) => {
    const { id } = req.params;
    try {
      const post = await addpost.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
      const result = await addpost.findByIdAndDelete(id);
      if (result) {
        res.status(200).json({ message: "Post deleted successfully!" });
      } else {
        res.status(404).json({ message: "Post not found." });
      }
    } catch (e) {
      console.error("Error in deletion:", e);
      res.status(500).json({ message: "Error deleting post.", e });
    }
  };

  exports.editpost = async (req, res) => {
    const { id } = req.params;
    const { title, content, authorname, date, tags } = req.body;
  
    try {
      const post = await addpost.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
  
      post.title = title || post.title;
      post.content = content || post.content;
      post.authorname = authorname || post.authorname;
      post.date = date || post.date;
      post.tags = tags || post.tags;
  
      const updatedPost = await post.save();
      return res.status(200).json(updatedPost);
    } catch (e) {
      console.error("Error in updating:", e);
      res.status(500).json({ message: "Error updating post.", e });
    }
  };