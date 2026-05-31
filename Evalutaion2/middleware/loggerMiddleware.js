const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} ${new Date().toSOString()}`
);
next()
};

module.exports=logger