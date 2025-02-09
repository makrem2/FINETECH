const express = require("express");
const {
  register,
  login,
  verifyEmail,
  signout,
  unblockUser,
  blockUser,
  ChecktokenBlacklist,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/verifyEmail", verifyEmail);
router.post("/signout", signout);

router.put("/unblockUser/:id", unblockUser);
router.put("/blockUser/:id", blockUser);

router.get("/tokenBlacklist/:token", ChecktokenBlacklist);

module.exports = router;
