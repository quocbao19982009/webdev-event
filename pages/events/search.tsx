import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { EventInterface } from "@/types/eventInterface";
import EventItem from "@/components/EventItem";
import { getAllEvents, getEventByTerm } from "lib/api";
interface SearchPageProps {
  events: EventInterface[];
}

const SearchPage = ({ events }: SearchPageProps) => {
  const router = useRouter();
  const term = router.query.term;
  console.log(events);

  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <h1>{`Search Result for ${term}`} </h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => {
        return <EventItem key={event.id} event={event} />;
      })}
    </Layout>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.term as string;

  const events = await getEventByTerm(query);

  return {
    props: {
      events: events,
    },
  };
};
