import React, {useState} from 'react'
import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import img4 from '../images/img4.jpg'
import { StyledImg } from '../styles/StyledImg'


export default function CarouselComponent() {

  return (
    <Carousel
      infinite
      autoPlay={4000}
      animationSpeed={2000}
    >
      <StyledImg src={img1} alt="" />
      <StyledImg src={img2} alt="" />
      <StyledImg src={img3} alt="" />
      <StyledImg src={img4} alt="" />
    </Carousel>
  )
}