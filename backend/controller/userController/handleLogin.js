const crypto = require("node:crypto");
const User = require("../../modal/user");
const NWT = require('../../lib/NWT');
async function handleLogin(req, res) {

  const { username,  password } = req.body;
 
  if (!username && !password) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "some fild are missing " }));
  }
  try {
    const iterations = 1000; // Number of iterations for key derivation
    const keyLength = 64; // Length of the derived key in bytes
     
    const finduser = await User.findOne({username :req.body.username});
    const { password: storedpwd, salt } = finduser;

    const hashpwd = crypto
      .pbkdf2Sync(password, salt, iterations, keyLength, "sha512")
      .toString("hex");

    if (hashpwd === storedpwd) {

      const accesstoken = NWT.createToken({"username":username},process.env.ACCESS_TOKEN_SECRET,300);
      const refreshtoken = NWT.createToken({"username":username},process.env.REFRESH_TOKEN_SECRET,86400);
     
      await  User.updateOne({ username: username }, { $set: {refreshtoken : refreshtoken } });

      res.setHeader('Set-Cookie', `jwt=${refreshtoken}; HttpOnly; Max-Age=86400`);
      res.setHeader("Content-Type", "application/json");

      res.statusCode = 200;
      res.end(JSON.stringify({...finduser._doc,accesstoken,refreshtoken:""}));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 401;
      res.end(JSON.stringify({ message: "Incorrect password" }));
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: e }));
  }
}

module.exports = handleLogin;
