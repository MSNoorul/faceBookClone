const Post = require("../../modal/post");
const User = require("../../modal/user");

// http.createServer((req ,res)=>{
async function likePost(req, res, path) {

  const regex = /^\/post\/like\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; 

  try {
    const post = await Post.findOne(filter);
    const currentuser = await User.findOne({ _id: req.body.id});
    // console.log(post)
    // console.log(currentuser)

    if (!post.likes.includes(currentuser.username)) {
console.log("come to if")
      const result = await post.updateOne({ $push: { likes: currentuser.username} });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "altready liked" + Id }));
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: e }));
  }
}

module.exports = likePost;
