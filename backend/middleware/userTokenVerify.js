import jsonwebtoken from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
   // res.send(req.headers);
    // const token = req.headers.authorization.split(" ")[1];
    const token=req.cookies.auth_token;
    const a = jsonwebtoken.verify(token, process.env.jwt_secret);
    req.userId = a.userId;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid Token", errMsg: error.message });
  }
};
