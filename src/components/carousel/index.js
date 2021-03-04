import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Carousel() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 4,
                arrows: true,
                slidesToScroll: 1,
                }
            },
            {
                breakpoint: 900,
                settings: {
                slidesToShow: 3,
                arrows: true,
                slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 2,
                arrows: true,
                slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                arrows: true,
                slidesToScroll: 1,
                }
            }
        ]
      };

    return (
        <Slider {...settings}>
            {children}
        </Slider>
    )
}