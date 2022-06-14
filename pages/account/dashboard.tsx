import { EventInputInterface } from "@/types/eventInputInterface";
import { parseCookies } from "lib/helper";
import { GetServerSideProps } from "next";
import React, { useContext } from "react";

import Layout from "@/components/Layout";
import styles from "@/styles/Dashbroad.module.css";
import { EventInterface } from "@/types/eventInterface";
import DashboardEvent from "@/components/DashboardEvent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteEvent } from "lib/api";
import { useRouter } from "next/router";

interface DashboardPageProps {
  events: EventInterface[];
  token: string;
}

const DashboardPage = ({ events, token }: DashboardPageProps) => {
  const router = useRouter();

  const deleteHandler = async (id: string | number) => {
    console.log("To delete event with id: ", id);
    console.log(id, token);
    if (confirm("Are you sure?")) {
      const res = await deleteEvent(id, token);
      if (!res.ok) {
        toast.error("Fail to delete event");
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout title="User dashbroad">
      <ToastContainer />
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My events</h3>
        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={deleteHandler}
          />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { token } = parseCookies(req);

  const res = await fetch(`${process.env.API_URL}/api/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = await res.json();

  console.log(data);

  return {
    props: { events: data, token },
  };
};
