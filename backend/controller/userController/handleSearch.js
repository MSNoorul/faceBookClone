const User = require("../../modal/user");

// http.createServer((req ,res)=>{
async function handleSearch( res ,path) {

  const regex = /^\/user\/search\/(\w+)$/;
  const query = regex.exec(path)[1];

  try {
    const result =  await User.find({ username: { $regex: `^${query}`, $options: 'i' } });
    
    if (result) {
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

module.exports = handleSearch;