import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { GetServerSideProps } from "next";
import Link from "next/link";

import styles from "@/styles/Form.module.css";
import Layout from "@/components/Layout";
import { EventInputInterface } from "@/types/eventInputInterface";
import { getEventById, updateEvent } from "lib/api";
import { EventInterface } from "@/types/eventInterface";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { ImageInterface } from "@/types/imageInterface";
import { parseCookies } from "lib/helper";

interface EditPageProps {
  event: EventInterface;
  token: string;
}

const EditPage = ({ event, token }: EditPageProps) => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<EventInputInterface>({
    name: event.attributes.name,
    organizer: event.attributes.organizer,
    venue: event.attributes.venue,
    address: event.attributes.address,
    date: event.attributes.date,
    time: event.attributes.time,
    description: event.attributes.description,
    image: event.attributes.image.data
      ? { id: event.attributes.image.data.id }
      : null,

    // {
    //   id: event.attributes.image.data ? event.attributes.image.data.id : null,
    // },
  });

  const [imagePreview, setImagePreview] = useState(
    event.attributes.image.data
      ? event.attributes.image.data.attributes.formats.thumbnail.url
      : null
  );

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isInputInvalid = Object.values(inputValue).some(
      (input) => input === ""
    );

    if (isInputInvalid) {
      toast.error("Please entered valid input");
    }

    const res = await updateEvent(event.id, inputValue, token);

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

  const imageUploadHandler = (image: ImageInterface) => {
    setInputValue({ ...inputValue, image: { id: image.id } });
    setImagePreview(image.formats.thumbnail.url);
    setShowModal(false);
  };

  useEffect(() => {
    if (!event) {
      router.push("/404");
    }
  }, [event]);

  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <ToastContainer />
      <h3>Edit Event</h3>
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
              value={dayjs(inputValue.date).format("YYYY-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="Text"
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
          Update event
        </button>
        <h2>Event Image</h2>
        {imagePreview ? (
          <Image src={imagePreview} height={100} width={170}></Image>
        ) : (
          <div>
            <p>No image upload</p>
          </div>
        )}
      </form>
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={"Edit Image"}
      >
        <ImageUpload
          token={token}
          eventId={event.id}
          imageUploaded={imageUploadHandler}
        />
      </Modal>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params!.id as string;
  const req = context.req;
  const event = await getEventById(id);
  const { token } = parseCookies(req);

  if (!event) {
    return {
      redirect: {
        destination: "/404",
      },
      props: {},
    };
  }

  return {
    props: { event, token },
  };
};

export default EditPage;
