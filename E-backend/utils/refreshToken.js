const jwt = require("jsonwebtoken");
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.SECERET_STRING, { expiresIn: "3d" });
};

module.exports = { generateRefreshToken };
