const Post = require("../../modal/post");
const User = require("../../modal/user");

// http.createServer((req ,res)=>{
async function getAllPost( res ,path) {

  const regex = /^\/post\/timeline\/(\w+)$/;
  const Id = regex.exec(path)[1];

  try {
    const user = await User.findById(Id);

    const userPosts = await Post.find({userId:Id}).sort({ createdAt: -1 });
    const frindsPosts = await Promise.all(
        user.following.map((id)=>Post.find({userId:id}))
    )

   const result = userPosts.concat(...frindsPosts);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));

        // res.writeHead(404, { "Content-Type": "application/json" });
        // res.end(JSON.stringify({ message: "post not Found" }));
    
  } catch (e) {
    res.writeHead(500,{ "Content-Type": "application/json" });
      res.end(JSON.stringify({ message:e }));
  }
}

module.exports = getAllPost;