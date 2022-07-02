import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //   destroy cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: "Success" });
  } else {
    res.setHeader("Allow", ["Post"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default logoutHandler;
