import qs from "qs";

import { EventInterface } from "@/types/eventInterface";
import { EventInputInterface } from "@/types/eventInputInterface";
import { MetaInterface } from "@/types/metaInterface";
import { json } from "stream/consumers";

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

export const deleteEvent = async (eventId: number | string) => {
  const res = await fetch(`${process.env.API_URL}/api/events/${eventId}`, {
    method: "DELETE",
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
  eventInput: EventInputInterface
) => {
  const res = await fetch(`${process.env.API_URL}/api/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: eventInput }),
  });

  return res;
};
