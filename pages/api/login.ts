import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiRes = await fetch(`${process.env.API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // set Cookie in http
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7 * 30,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user: data.user });
    } else {
      res.status(strapiRes.status).json({
        message:
          Object.keys(data.error.details).length === 0
            ? data.error.message
            : data.error.details.errors[0].message,
      });
    }
  } else {
    res.setHeader("Allow", ["Post"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
