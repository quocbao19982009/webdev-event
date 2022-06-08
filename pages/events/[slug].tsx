import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

import { EventInterface } from "@/types/eventInterface";
import Layout from "@/components/Layout";
import styles from "@/styles/EventDetailPage.module.css";
import Image from "next/image";
import { deleteEvent, getEventsBySlug } from "lib/api";

interface EventDetailPageProps {
  event: EventInterface;
}

const EventDetailPage = ({ event }: EventDetailPageProps) => {
  const router = useRouter();

  const deleteEventHandler = async () => {
    if (confirm("Are you sure?")) {
      const res = await deleteEvent(event.id);

      if (!res.ok) {
        toast.error("Fail to delete event");
      } else {
        router.push("/events");
      }
    }
    return;
  };
  const { venue, address, date, time, performers, description, image, name } =
    event.attributes;

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit
            </a>
          </Link>

          <a href="#" className={styles.delete} onClick={deleteEventHandler}>
            <FaTimes /> Delete
          </a>
        </div>
        <span>
          {dayjs(date).format("ddd DD.MM.YYYY")} at {time}
        </span>
        <h2>{name}</h2>
        <div className={styles.image}>
          <Image
            src={
              image.data
                ? image.data.attributes.url
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
