import { createUser, searchUser } from "../services/auth.service.js";
import { handleError } from "../utils/constant.js";
import { compareBcrypt, hashBcrypt } from "../utils/bcrypt.js";
import { createJwtToken, verifyJwtToken } from "../utils/jwt.js";
import { OAuth2Client } from "google-auth-library";

export const authHome = (req, res) => {
  try {
    res.json({
      success: true,
      message: "Welcome auth api",
    });
  } catch (error) {
    handleError(error, "Auth home error");
  }
};

export const authRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExist = await searchUser(username);

    if (userExist) {
      return res.json({
        success: false,
        message: "Username Already Exist",
      });
    }

    const hashedPassword = await hashBcrypt(password);
    const ImageURl = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;

    const userCreated = await createUser({
      username,
      image: ImageURl,
      password: hashedPassword,
    });

    if (!userCreated) {
      return res.json({
        success: false,
        message: "Internal Server Problem",
      });
    }

    const token = createJwtToken(userCreated.username, userCreated._id);

    res.cookie("InsightAuth", token, {
      path: "/",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    handleError(error, "Auth register Error in Controller");
  }
};

export const authLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await searchUser(username);

    if (!user) {
      return res.json({
        success: false,
        message: "Username or password is wrong",
      });
    }

    const isMatch = await compareBcrypt(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Username or password is wrong",
      });
    }

    const token = createJwtToken(user.username, user._id);

    res.cookie("InsightAuth", token, {
      path: "/",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "You are logged in Successfully",
    });
  } catch (error) {
    handleError(error, "Login Auth Error");
  }
};

export const authLogout = (req, res) => {
  try {
    const { InsightAuth } = req.cookies;

    if (!InsightAuth) {
      return res.json({
        success: true,
        message: "You are already logout",
      });
    }

    res.clearCookie("InsightAuth", {
      path: "/",
    });

    res.json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    handleError(error, "Auth logout error");
  }
};

export const authVerify = async (req, res) => {
  try {
    const { InsightAuth } = req.cookies;

    if (typeof InsightAuth === "undefined") {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decodedToken = verifyJwtToken(InsightAuth);

    const verifiedUser = await searchUser(decodedToken.username);

    if (!verifiedUser || verifiedUser._id.toString() !== decodedToken.id) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    res.json({
      success: true,
      message: "verified",
      user: verifiedUser,
    });
  } catch (error) {
    handleError(error, "Auth verify error");
  }
};

export const authGoogle = async (req, res) => {
  const { code } = req.body;

  const client_id = process.env.CLIENT_ID;
  const secret_key = process.env.CLIENT_SECRET;
  try {
    const client = new OAuth2Client(client_id, secret_key, "postmessage");

    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: client_id,
    });

    const payload = ticket.getPayload();

    const { name, email, picture } = payload;

    let user = await searchUser(email);

    const hashedPassword = await hashBcrypt(`${name}google`);

    if (!user) {
      user = await createUser({
        username: email,
        image: picture,
        password: hashedPassword,
      });
    }

    const jwtToken = createJwtToken(email, user._id);

    res.cookie("InsightAuth", jwtToken, {
      path: "/",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "working",
    });
  } catch (error) {
    handleError(error, "Google Auth error");
  }
};
