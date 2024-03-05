import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './UiCarousel.css';
import { Box } from '@mui/material';
import UiImage from '../image/UiImage';

type Props = {
  images: string[],
  alt: string
}

export default function UiCarousel(props: Props) {
  const { images, alt } = props;

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass="carousel-dot-list"
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 1
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 1
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable>
      {images.map((image: string, index: number) =>
        <Box component={'div'} key={index} minWidth={500}>
          <UiImage 
            src={image}
            alt={`${alt}_${index}`}
            borderRadius={15} />
        </Box>
      )}
    </Carousel>
  )
}
