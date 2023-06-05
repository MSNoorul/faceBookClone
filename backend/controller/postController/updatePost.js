const Post = require('../../modal/post');

async function updatePost(req, res, path) {

  const regex = /^\/post\/update\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; // Replace with the appropriate filter
  const update = { $set: req.body };
  try {
    const result = await Post.updateOne(filter, update);

    if (result.acknowledged) {
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

module.exports = updatePost;


