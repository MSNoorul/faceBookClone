const Post = require("../../modal/post");

async function createPost(req, res) {

  try {
    const newpost = new Post(req.body);
    const result = await newpost.save();
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: e }));
  }
}

module.exports = createPost;
