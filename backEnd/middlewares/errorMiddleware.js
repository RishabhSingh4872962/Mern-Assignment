
module.exports=(req,res,next)=>{
  const statusCode = 500;
  
  const message = 'Internal Server Error';
  res.status(statusCode).json({ error: message });
}