import qs from "qs";

import { EventInterface } from "@/types/eventInterface";
import { EventInputInterface } from "@/types/eventInputInterface";

export const getAllEvents = async () => {
  const res = await fetch(`${process.env.API_URL}/api/events?populate=*`);

  const { data }: { data: EventInterface[] } = await res.json();

  return data;
};

export const getEventsBySlug = async (slugInput: string) => {
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        slug: {
          $eq: slugInput,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.API_URL}/api/events?${query}`);

  const { data }: { data: EventInterface[] } = await res.json();

  return data;
};

export const getEventByTerm = async (input: string) => {
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        $or: [
          {
            name: {
              $containsi: input,
            },
          },
          {
            performers: {
              $containsi: input,
            },
          },
          {
            description: {
              $containsi: input,
            },
          },
          {
            venue: {
              $containsi: input,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${process.env.API_URL}/api/events?${query}`);

  const { data }: { data: EventInterface[] } = await res.json();

  return data;
};

export const addEvent = async (eventInput: EventInputInterface) => {
  const res = await fetch(`${process.env.API_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: eventInput }),
  });

  return res;
};
