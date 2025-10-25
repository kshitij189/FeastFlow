import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(401).send({ success: false, msg: "Authorization header missing" });
    }
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).send({ success: false, msg: "Invalid authorization format" });
    }
    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          msg: "Un-Authorize User",
        });
      }
      req.body.id = decode.id;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in auth API",
    });
  }
};

export default authMiddleware;
