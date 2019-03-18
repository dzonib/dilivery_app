import React, {useState} from 'react'
import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import img1 from '../images/image1.png'
import img2 from '../images/image2.jpg'
import img3 from '../images/image3.jpg'
import img4 from '../images/image4.jpg'


export default function CarouselComponent() {
  return (
    <Carousel
      autoPlay={4000}
      animationSpeed={2000}
      infinite
    >
      <img src={img1} alt=""/>
      <img src={img2} alt=""/>
      <img src={img3} alt=""/>
      <img src={img4} alt=""/>
    </Carousel>
  )
}