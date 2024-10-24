import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';

interface SwiperProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  spaceBetween?: number;
  slidesPerView?: number;
  pagination?: boolean;
}

export default function SwiperComponent<T>({
  items,
  renderItem,
  spaceBetween = 20,
  slidesPerView = 1.3,
  pagination = true,
}: SwiperProps<T>) {
  return (
    <Swiper
      pagination={pagination}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      modules={[Pagination]}
      className="mt-3 mb-10 h-full"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{renderItem(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
}
