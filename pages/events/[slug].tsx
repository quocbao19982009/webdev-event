import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { EventInterface } from "@/types/eventInterface";
import Layout from "@/components/Layout";
import styles from "@/styles/EventDetailPage.module.css";
import Image from "next/image";
import { getEventsBySlug } from "lib/api";

interface EventDetailPageProps {
  event: EventInterface;
}

const EventDetailPage = ({ event }: EventDetailPageProps) => {
  const deleteEvent = () => {};

  const { venue, address, date, time, performers, description, image } =
    event.attributes;

  console.log(event);

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
          {date} at {time}
        </span>
        <div className={styles.image}>
          <Image
            src={
              image.data
                ? image.data.attributes.formats.medium.url
                : "/images/event-default.png"
            }
            width={960}
            height={600}
          />
        </div>
        <h3>Performers:</h3>
        <p>{performers}</p>
        <h3>Description</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params!.slug as string;
  const event = await getEventsBySlug(slug);

  return {
    props: {
      event: event[0],
    },
  };
};
