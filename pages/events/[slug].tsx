import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { EventInterface } from "@/types/eventInterface";
import Layout from "@/components/Layout";
import styles from "@/styles/EventDetailPage.module.css";
import Image from "next/image";

interface EventDetailPageProps {
  event: EventInterface;
}

const EventDetailPage = ({ event }: EventDetailPageProps) => {
  const deleteEvent = () => {};

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a className="btn">
              <FaTimes /> Edit
            </a>
          </Link>

          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaPencilAlt /> Delete
          </a>
        </div>
        <span>
          {event.date} at {event.time}
        </span>
        <div className={styles.image}>
          <Image src={event.image} width={960} height={600} />
        </div>
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params!.slug;
  const res = await fetch(`${process.env.API_URL}/api/events/${slug}`);
  const event = await res.json();

  console.log(event);

  return {
    props: {
      event: event[0],
    },
  };
};
