const http = require('node:http');
const envCofig = require('./configration/envConfig');
const mongooseConfig = require('./configration/mongooseConfig');
const bodyParser = require('./configration/bodyParser');
const { log } = require('node:console');
const mongoose = require('mongoose');
const url  = require('node:url');
const helmet = require('./middleware/helmet');
const handleUserRoutes = require('./router/userRouter');
const handlePostRoutes = require('./router/postRouter');
const cors = require('./middleware/cors');
const Cors = require('cors');

envCofig();
mongooseConfig();
// const corsmiddleware = Cors();

const PORT= process.env.PORT || 3000;


const server = http.createServer(async (req , res )=>{
  // corsmiddleware(req ,res , async ()=>{
    cors(res ,req);
    if(req.method == 'OPTIONS') return;
    
    helmet(res);  // Set security headers manually
    
    req.body = await bodyParser(req);
    
    const parsedUrl = url.parse(req.url,true);
    const pathname = parsedUrl.pathname;
    
    const regexuser = /^\/user\/?\w*/;
    const regexpost = /^\/post\/?\w*/;

    if (regexuser.test(pathname)) {
        handleUserRoutes(req, res ,pathname);
      } 
    else if (regexpost.test(pathname)) {
        handlePostRoutes(req, res ,pathname);
      } 
        
})


mongoose.connection.once('open',()=>{
    log('dp connected')
    server.listen(PORT,log('server runing on port '+' : '+PORT))
})







