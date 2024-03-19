import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const gallryImages = async () => {
    const response = await fetch("http://api.islamicposhak.com/api/gallery");
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
    gallryImages();
  }, []);
  return (
    <div className="mt-5">
      <ImageGallery items={images} />
    </div>
  );
}
