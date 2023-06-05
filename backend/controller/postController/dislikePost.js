const Post = require("../../modal/post");
const User = require("../../modal/user");


async function dislikePost(req, res, path) {

  const regex = /^\/post\/dislike\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; // Replace with the appropriate filter

  try {
    const post = await Post.findOne(filter);
    const currentuser = await User.findOne({ _id: req.body.id });
    if (post.likes.includes(currentuser.username)) {
      
      const result = await post.updateOne({ $pull: { likes: currentuser.username } });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "like not found" + Id }));
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: e }));
  }
}

module.exports = dislikePost;