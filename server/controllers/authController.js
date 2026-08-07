import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { clearSessionCookie, setSessionCookie } from "../utils/jwt.js";

const googleClient = new OAuth2Client();

export async function googleLogin(req, res, next) {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ success: false, message: "Google credential is required" });
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload?.sub || !payload.email || !payload.email_verified) {
      return res.status(401).json({ success: false, message: "Google account could not be verified" });
    }
    let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email: payload.email.toLowerCase() }] });
    if (user && user.googleId !== payload.sub) return res.status(409).json({ success: false, message: "This email is linked to a different account" });
    if (!user) user = await User.create({ googleId: payload.sub, name: payload.name || payload.email, email: payload.email, profilePicture: payload.picture || "" });
    setSessionCookie(res, user.id);
    return res.json({ success: true, data: { user } });
  } catch (error) {
    if (error.message?.toLowerCase().includes("token")) return res.status(401).json({ success: false, message: "Invalid Google credential" });
    next(error);
  }
}

export function getCurrentUser(req, res) { res.json({ success: true, data: { user: req.user } }); }
export function logout(req, res) { clearSessionCookie(res); res.json({ success: true, data: {} }); }
