import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "@/styles/Form.module.css";
import Layout from "../../components/Layout";
import Link from "next/link";
import { EventInputInterface } from "@/types/eventInputInterface";
import { addEvent } from "lib/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "lib/helper";

interface AddPageProps {
  token: string;
}

const AddPage = ({ token }: AddPageProps) => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<EventInputInterface>({
    name: "",
    organizer: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isInputInvalid = Object.values(inputValue).some(
      (input) => input === ""
    );

    if (isInputInvalid) {
      toast.error("Please entered valid input");
      return;
    }

    const res = await addEvent(inputValue, token);

    if (!res.ok) {
      if (res.status === 403) {
        toast.error("Not Authorize");
        return;
      }
      toast.error("Something went wrong");
    } else {
      const { data } = await res.json();
      router.push(`/events/${data.attributes.slug}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <ToastContainer />
      <h3>Add Event</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputValue.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="organizer">Organizer</label>
            <input
              type="text"
              name="organizer"
              id="organizer"
              value={inputValue.organizer}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={inputValue.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={inputValue.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={inputValue.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              name="time"
              id="time"
              value={inputValue.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            value={inputValue.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button type="submit" className="btn">
          Add event
        </button>
      </form>
    </Layout>
  );
};

export default AddPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { token } = parseCookies(req);
  console.log(token);

  return {
    props: { token },
  };
};
