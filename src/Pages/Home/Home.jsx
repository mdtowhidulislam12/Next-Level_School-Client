import React from 'react';
import Carousel from './Carousel';
import FeaturesProduct from './FeaturesProduct';
import TrendingProducts from './TrendingProducts';
import Slider from './Slider';
import Hero from './Hero';
import ReviewForm from './ReviewForm';
import Reviewslider from './Reviewslider';

const Home = () => {
    return (
        <div>
            {/* Carousel */}
            <Carousel></Carousel>

            {/* featurs products */}
            <FeaturesProduct></FeaturesProduct>

            {/* slider */}

            <Slider></Slider>

            {/* trending products section */}

            <TrendingProducts></TrendingProducts>

            {/* hero */}

            <Hero></Hero>

            {/* Reviews */}

            <Reviewslider></Reviewslider>

            {/* reviews form */}

            <ReviewForm></ReviewForm>
        </div>
    );
};

export default Home;