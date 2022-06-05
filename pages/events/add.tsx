import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "@/styles/AddPage.module.css";
import Layout from "../../components/Layout";
import Link from "next/link";
import { EventInputInterface } from "@/types/eventInputInterface";
import { addEvent } from "lib/api";

const AddPage = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<EventInputInterface>({
    name: "",
    performers: "",
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
    }

    const res = await addEvent(inputValue);

    if (!res.ok) {
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
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={inputValue.performers}
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
