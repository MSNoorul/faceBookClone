const http = require("http");
const User = require("../../modal/user");

// http.createServer((req ,res)=>{
async function handleUpdate(req, res, path) {

  const regex = /^\/user\/update\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; 
  const update = { $set: req.body };
  console.log(req.body)
  try {
    const result = await User.updateOne(filter, update);

    if (result.acknowledged) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }  else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "user not Found" }));
    }
  } catch (e) {
      res.writeHead(500,{ "Content-Type": "application/json" });
      res.end(JSON.stringify({ message:e }));
  }
}

module.exports = handleUpdate;

// })
