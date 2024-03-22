import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ImageGallery from "react-image-gallery";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const galleryImages = async () => {
    const response = await fetch("http://localhost:5000/api/gallery");
    const data = await response.json();
    setImages(
      data.data?.map((image) => ({
        original: image.image,
        thumbnail: image.image,
      }))
    );
    console.log("gallery", data);
  };

  useEffect(() => {
    galleryImages();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Gallery</title>
        <meta
          name="description"
          content="
        Islamic poshak collection is a online shop for islamic dress. We provide all types of islamic dresses
          "
        />
      </Helmet>
      <div className="mt-5">
        {images ? <ImageGallery items={images} /> : null}
      </div>
    </div>
  );
}
