import EventItem from "@/components/EventItem";
import { EventInterface } from "@/types/eventInterface";
import { GetServerSideProps } from "next";
import React from "react";

import Layout from "../../components/Layout";

interface EventsPageProps {
  events: EventInterface[];
}

const EventsPage = ({ events }: EventsPageProps) => {
  return (
    <Layout>
      <h1> All Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
};

export default EventsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {
      events: events,
    },
  };
};
