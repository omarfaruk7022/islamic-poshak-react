import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import banner1 from "../assets/images/bg-islamic-poshak.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import banner5 from "../../assets/images/banner5.jpg";
import logo from "../../assets/images/logo-1.png";

export default function Banner() {
  return (
    <div>
      <div>
        <Image className="h-[600px] object-cover" src={banner1} alt=""></Image>

        {/* <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
        >
          <SwiperSlide>
            <div>
              <Image
                className="h-[600px] object-cover absolute"
                src={banner2}
                alt=""
              ></Image>
              <Image className="relative" width={200} src={logo} alt=""></Image>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Image
                className="h-[600px] object-cover"
                src={banner3}
                alt=""
              ></Image>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Image
                className="h-[600px] object-cover absolute"
                src={banner1}
                alt=""
              ></Image>
              <Image className="relative" width={200} src={logo} alt=""></Image>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Image
                className="h-[600px] object-cover absolute"
                src={banner4}
                alt=""
              ></Image>
              <Image className="relative" width={200} src={logo} alt=""></Image>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Image
                className="h-[600px] object-cover absolute"
                src={banner5}
                alt=""
              ></Image>
              <Image className="relative" width={200} src={logo} alt=""></Image>
            </div>
          </SwiperSlide>
        </Swiper> */}
      </div>
    </div>
  );
}
