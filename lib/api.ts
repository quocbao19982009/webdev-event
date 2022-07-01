import qs from "qs";

import { EventInterface } from "@/types/eventInterface";
import { EventInputInterface } from "@/types/eventInputInterface";
import { MetaInterface } from "@/types/metaInterface";
import { json } from "stream/consumers";
import { parseCookies } from "./helper";

export const getAllEvents = async (pageNumber: number | string = 1) => {
  const query = qs.stringify(
    {
      populate: "*",
      sort: ["date"],
      pagination: {
        page: pageNumber,
        pageSize: 2,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.API_URL}/api/events?${query}`);

  const data: { data: EventInterface[]; meta: MetaInterface } =
    await res.json();

  return data;
};

export const getUpcomingEvents = async () => {
  const query = qs.stringify(
    {
      populate: "*",
      sort: ["date"],
      pagination: {
        start: 0,
        limit: 3,
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

  return res;
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
            organizer: {
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

export const addEvent = async (
  eventInput: EventInputInterface,
  token: string
) => {
  const res = await fetch(`${process.env.API_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: eventInput }),
  });

  console.log(token);

  return res;
};

export const deleteEvent = async (eventId: number | string, token: string) => {
  const res = await fetch(`${process.env.API_URL}/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getEventById = async (eventId: number | string) => {
  const res = await fetch(
    `${process.env.API_URL}/api/events/${eventId}?populate=*`
  );
  const { data } = await res.json();
  return data as EventInterface;
};

export const updateEvent = async (
  eventId: number | string,
  eventInput: EventInputInterface,
  token: string
) => {
  console.log("event ID", eventId);
  console.log("body iput", eventInput);
  console.log("token", token);

  const res = await fetch(`${process.env.API_URL}/api/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: eventInput }),
  });

  return res;
};
