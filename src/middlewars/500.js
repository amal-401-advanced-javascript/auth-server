function errorHandler(err,req,res,next){
  res.status(500);
  res.statusMessage = 'Server Error :(';
  res.json({error: 'Server error :('});
}
module.exports = errorHandler;

