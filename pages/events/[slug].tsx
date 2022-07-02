import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useContext } from "react";
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
import { AuthContext } from "context/AuthContext";
import EventMap from "@/components/EventMap";

interface EventDetailPageProps {
  event: EventInterface;
}

const EventDetailPage = ({ event }: EventDetailPageProps) => {
  const ctx = useContext(AuthContext);
  const user = ctx?.user;
  console.log(event);
  console.log(user);

  const { venue, address, date, time, organizer, description, image, name } =
    event.attributes;

  return (
    <Layout>
      <ToastContainer />
      {event && (
        <div className={styles.event}>
          <span>
            {dayjs(date).format("ddd DD.MM.YYYY")} at {time}
          </span>
          <h2>{name}</h2>
          <div className={styles.image}>
            <Image
              alt="event's image"
              src={
                image.data
                  ? image.data.attributes.url
                  : "/images/event-default.jpg"
              }
              width={960}
              height={600}
            />
          </div>

          <h3>Event Organizer:</h3>
          <p>{organizer}</p>
          <h3>Description:</h3>
          <p>{description}</p>
          <h3>Venue: {venue}</h3>
          <p>{address}</p>
          <EventMap eventAddress={event.attributes.address} />
          <Link href="/events">
            <a className={styles.back}>{"<"} Go Back</a>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default EventDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params!.slug as string;
  const resApi = await getEventsBySlug(slug);
  const { data } = await resApi.json();

  if (data.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }

  const event = data[0];

  return {
    props: {
      event: event,
    },
  };
};
