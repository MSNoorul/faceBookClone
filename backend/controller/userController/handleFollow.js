
const User = require("../../modal/user");

// http.createServer((req ,res)=>{
async function handleFollow(req,res ,path) {

  const regex = /^\/user\/follow\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = {_id: Id }; // Replace with the appropriate filter

  try {
    const user = await User.findOne(filter);
    const requestuser = await User.findOne({_id:req.body.id});
   
    if (!requestuser.following.includes(Id)) {

     const result1 =  await user.updateOne({$push:{followers:Id}});
     const result2 =  await requestuser.updateOne({$push:{following:Id}});

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result2));
    }  else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "altready followed" +Id }));
    }
  } catch (e) {
    res.writeHead(500,{ "Content-Type": "application/json" });
      res.end(JSON.stringify({ message:e }));
  }
}

module.exports = handleFollow;