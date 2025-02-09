const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const SendMail = require("../shared/utils/SendEmail");
const config = require("../shared/utils/auth.config");
const crypto = require("crypto");
const TokenBlackList = require("../models/tokenBlacklistModel");

exports.register = async (req, res) => {
  const { email, password, phone, name, address } = req.body;
  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      phone,
      name,
      address,
      isVerified: false,
      verificationToken,
      verificationCode,
    });

    const verificationLink = `http://localhost:4200/verify-email?token=${verificationToken}`;

    let subject = "Email Verification";
    let htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          h2 { color: #4CAF50; }
          p { font-size: 16px; line-height: 1.6; }
          .btn { display: inline-block; background-color: #4CAF50; color: #ffffff; font-size: 16px; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          .btn:hover { background-color: #45a049; }
          .verification-code { background-color: #f0f0f0; border: 1px solid #ddd; padding: 10px; font-size: 18px; font-weight: bold; color: #333; display: inline-block; margin-top: 20px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hello ${user.username},</h2>
          <p>Thank you for registering with us! Please verify your email address by clicking the button below:</p>
          <a href="${verificationLink}" class="btn">Verify Email</a>
          <p>Or enter the verification code manually:</p>
          <div class="verification-code">${verificationCode}</div>
          <p>If you did not sign up for this account, please ignore this email.</p>
          <p>Best regards,<br>FINETECH</p>
        </div>
      </body>
    </html>`;

    await SendMail(user.email, subject, htmlContent);

    res.send({
      message:
        "User registered successfully! Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.verifyEmail = async (req, res) => {
  try {
    const { token, verificationCode } = req.body;

    if (!token || !verificationCode) {
      return res.status(400).send({
        message: "Verification token and code are required.",
      });
    }

    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Invalid or expired verification token." });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).send({ message: "Invalid verification code." });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationCode = null;
    await user.save();

    res.send({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).send({
        message:
          "Vous devez vérifier votre adresse électronique avant de vous connecter.",
      });
    }
    if (!user.isBlocked) {
      return res.status(401).send({
        message: "Votre compte est bloqué. Contactez l'administrateur.",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        role: user.isAdmin ? "admin" : "user",
      },
      config.secret,
      {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );

    res.json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.isAdmin ? "admin" : "user",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.signout = async (req, res) => {
  const { token, userId } = req.body;

  if (!token || !userId) {
    return res.status(401).json({ message: "No token provided or User ID" });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).send("L'utilisateur n'a pas été trouvé.");
  }

  try {
    let tokenBlacklistEntry = await tokenBlacklist.findOne({
      where: { token: token },
    });

    if (!tokenBlacklistEntry) {
      await user.save();
      await tokenBlacklist.create({ token: token });
      return res.status(200).json({ message: "Déconnexion réussie" });
    } else {
      return res.status(401).json({ message: "Token déjà sur liste noire" });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors du traitement de la demande de déconnexion",
    });
  }
};
exports.blockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isBlocked = true;
    await user.save();
    return res.status(200).json({ message: "User has been blocked" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to block user" });
  }
};
exports.unblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isBlocked = false;
    await user.save();
    return res.status(200).json({ message: "User has been unblocked" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to unblock user" });
  }
};
exports.ChecktokenBlacklist =async (req,res)=>{
  const { token } = req.params;
  console.log('Checking token blacklist for:', token);

  const blacklistedToken = await TokenBlackList.findOne({ where: { token } });
  if (blacklistedToken) {
    console.log('Token is blacklisted:', token);
    return res.json({ isBlacklisted: true });
  }

  res.json({ isBlacklisted: false });
}
