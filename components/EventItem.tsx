import React from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import styles from "@/styles/EventItem.module.css";
import { EventInterface } from "@/types/eventInterface";

interface EventItemProps {
  event: EventInterface;
}

const EventItem = ({ event }: EventItemProps) => {
  const { name, slug, date, time } = event.attributes;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          alt="event's image"
          src={
            event.attributes.image.data
              ? event.attributes.image.data.attributes.formats.thumbnail.url
              : "/images/event-default.jpg"
          }
          height={100}
          width={170}
        />
      </div>
      <div className={styles.info}>
        <span>
          {dayjs(date).format("ddd DD.MM.YYYY")} at {time}
        </span>
        <h3>{name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
