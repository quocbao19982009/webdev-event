import EventItem from "@/components/EventItem";
import { EventInterface } from "@/types/eventInterface";
import { getAllEvents, getUpcomingEvents } from "lib/api";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import Layout from "../../components/Layout";

interface EventsPageProps {
  events: EventInterface[];
  pageCount: number;
}

const EventsPage = ({ events, pageCount }: EventsPageProps) => {
  const router = useRouter();
  const currentPage = router.query.page ? router.query.page : 1;

  return (
    <Layout>
      <h1> All Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      {currentPage > 1 && (
        <Link href={`/events?page=${+currentPage - 1}`}>
          <a className="btn-secondary">Previous</a>
        </Link>
      )}
      {pageCount > currentPage && (
        <Link href={`/events?page=${+currentPage + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </Layout>
  );
};

export default EventsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query ? context.query.page : "1";

  const { data: events, meta } = await getAllEvents(page as string);

  return {
    props: {
      events: events,
      pageCount: meta.pagination.pageCount,
    },
  };
};
