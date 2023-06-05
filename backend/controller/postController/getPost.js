const Post = require("../../modal/post");

// http.createServer((req ,res)=>{
async function getPost( res ,path) {

  const regex = /^\/post\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; // Replace with the appropriate filter

  try {
    const result = await Post.findOne(filter);
    
    if (result) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }  else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "post not Found" }));
    }
  } catch (e) {
    res.writeHead(500,{ "Content-Type": "application/json" });
      res.end(JSON.stringify({ message:e }));
  }
}

module.exports = getPost;