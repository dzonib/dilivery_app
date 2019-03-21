import React from 'react'
import CarouselComponent from './Carousel';
import { StyledLanding } from '../styles/StyledLanding'
import LandingSidebar from './LaindingSIderbar'


export default function Landing() {
  return (
    <StyledLanding>
      <LandingSidebar />
      <CarouselComponent />
    </StyledLanding>
  )
}