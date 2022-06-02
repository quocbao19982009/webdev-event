import type { NextApiRequest, NextApiResponse } from "next";

import { EventInterface } from "@/types/eventInterface";
const { events } = require("./data.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventInterface[] | { message: string }>
) {
  const slug = req.query.slug;

  const event = events.filter((event: EventInterface) => event.slug === slug);

  if (req.method === "GET") {
    res.status(200).json(event);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
