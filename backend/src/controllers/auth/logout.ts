import { Response } from "express";

export const logout = async (req: any, res: Response) => {
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/" });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};
