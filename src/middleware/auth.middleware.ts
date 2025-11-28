import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized - token missing",
    });
  }

  try {
    const decoded = verify(token, "test key");
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: "Invalid token" });
  }
};
