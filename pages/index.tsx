import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { EventInterface } from "@/types/eventInterface";
import EventItem from "@/components/EventItem";
interface HomePageProps {
  events: EventInterface[];
}

const HomePage = ({ events }: HomePageProps) => {
  return (
    <Layout>
      <h1> Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {
      events: events.slice(0, 3),
    },
  };
};
