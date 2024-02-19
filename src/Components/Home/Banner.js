import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper";
import banner1 from "../../assets/images/bg-islamic-poshak.jpg";

export default function Banner() {
  return (
    <div>
      <div>
        <img className="h-full  object-cover w-full" src={banner1} alt=""></img>

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
