function log(req,res,next){
    console.log(req.url);
    next();
}

module.exports = log;