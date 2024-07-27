const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const JWT_KEY = "RBuGgRlv1hY1U3lsb5LqrEVNuieE66YI";
  const token = req.headers.authorization;
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  try {
    const user = jwt.verify(token, JWT_KEY);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("stock-site-token");
    return res.status(401).send({ auth: false, message: "Token expired." });
  }
};
