import argon2 from "argon2";
import type { NextFunction, Request, Response } from "express";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { password } = req.body;

    if (!password || typeof password !== "string") {
      res
        .status(400)
        .json({ error: "Password is required and must be a string" });
      return;
    }

    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (err) {
    next(err);
  }
};

export default { hashPassword };
