import React from 'react'
import Carousel from '../component/Carousel'
import About from '../component/About'
import WhyChoseUs from '../component/WhyChoseUs'
import Ready from '../component/Ready'
import FAQ from '../component/FAQ'
import Feature from '../component/Feature'

export default function Home() {
  return (
    <>
        <Carousel/>
        <Feature/>
        <About/>
        <WhyChoseUs/>
        <FAQ/>
        <Ready/>
    </>
  )
}
