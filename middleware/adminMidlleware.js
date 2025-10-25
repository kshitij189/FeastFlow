import { User } from "../models/userModel.js";

const adminMiddlware = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(401).send({ success: false, msg: "User not found" });
    }
    if (user.usertype !== 'admin') {
      return res.status(401).send({
        success: false,
        msg: "Only Admin Access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Un-Authorized ACCESS",
      error,
    });
  }
};

export default adminMiddlware;
