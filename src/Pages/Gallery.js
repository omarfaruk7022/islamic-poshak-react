import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const galleryImages = async () => {
    const response = await fetch("https://api.islamicposhak.com/api/gallery");
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
      <div className="mt-5">
        {images ? <ImageGallery items={images} /> : null}
      </div>
    </div>
  );
}
