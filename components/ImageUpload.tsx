import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import { ImageInterface } from "@/types/imageInterface";

interface ImageUploadProps {
  eventId: string | number;
  imageUploaded: (image: ImageInterface) => void;
  token: string;
}

const ImageUpload = ({ eventId, imageUploaded, token }: ImageUploadProps) => {
  const [image, setImage] = useState<null | File>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      alert("Please insert a image");
      return;
    }

    setLoadingImage(true);
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", eventId as string);
    formData.append("field", "image");

    const res = await fetch(`${process.env.API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const image = await res.json();
      imageUploaded(image[0]);
      setLoadingImage(false);
      return;
    }
    if (!res.ok) {
      setLoadingImage(false);
      alert("Cannot updated Image");
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files && e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input
            accept="image/png, image/gif, image/jpeg"
            type="file"
            onChange={handleFileChange}
          ></input>
        </div>
        {loadingImage && <p>Uploading, please wait...</p>}
        <button type="submit" className="btn">
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
