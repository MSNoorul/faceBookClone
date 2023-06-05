
const User = require("../../modal/user");

// http.createServer((req ,res)=>{
async function handleDelete(req, res, path) {

  const regex = /^\/user\/delete\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { username: Id }; // Replace with the appropriate filter

  try {
    const result = await User.deleteOne(filter);
    
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

module.exports = handleDelete;

// })
