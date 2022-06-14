import React from "react";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

import styles from "@/styles/DashboardEvent.module.css";
import { EventInterface } from "@/types/eventInterface";

interface DashboardEventProps {
  event: EventInterface;
  handleDelete: (id: string | number) => void;
}

const DashboardEvent = ({ event, handleDelete }: DashboardEventProps) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${event.attributes.slug}`}>
          <a>{event.attributes.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${event.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> edit event
        </a>
      </Link>

      <a className={styles.delete} onClick={() => handleDelete(event.id)}>
        <FaTimes /> Delete Event
      </a>
    </div>
  );
};

export default DashboardEvent;
