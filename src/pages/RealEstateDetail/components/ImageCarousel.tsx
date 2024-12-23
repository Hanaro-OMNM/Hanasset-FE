import { FiChevronLeft } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import React from 'react';

interface ImageCarouselProps {
  image: string;
  onBackClick: () => void;
}
const ImageCarousel: React.FC<ImageCarouselProps> = ({
  image,
  onBackClick,
}) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <button
        className="absolute top-30 text-white z-30 mt-3 ml-2"
        onClick={onBackClick}
      >
        <FiChevronLeft className="w-[30px] h-[30px] mr-4" />
      </button>
      <Slider {...settings}>
        {image ? (
          <div>
            <img
              src={'https://landthumb-phinf.pstatic.net/' + image}
              alt="이미지"
              className="w-full h-64 object-cover"
            />
          </div>
        ) : (
          <div>
            <img
              src="https://placehold.co/420x256"
              alt="임시 이미지"
              className="w-full h-64 object-cover"
            />
          </div>
        )}
      </Slider>
    </div>
  );
};
export default ImageCarousel;
