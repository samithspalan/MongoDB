import { getCollection, nextNumericId } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const USERS_COL = "users";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing username or password" });

    const users = getCollection(USERS_COL);
    const existing = await users.findOne({ username });
    if (existing) return res.status(409).json({ message: "Username already exists" });

    const hashed = bcrypt.hashSync(password, 10);
    const userId = await nextNumericId(USERS_COL, "userId");

    const doc = {
      userId,
      username,
      password: hashed,
      createdAt: new Date(),
    };

    await users.insertOne(doc);
    const token = jwt.sign({ userId, username }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });

    res.status(201).json({ user: { userId, username }, token });
  } catch (err) {
    console.error("signup error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing username or password" });

    const users = getCollection(USERS_COL);
    const user = await users.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.userId, username: user.username }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });

    res.json({ user: { userId: user.userId, username: user.username }, token });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
