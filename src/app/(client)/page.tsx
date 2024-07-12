import React from 'react';
import Header from './_components/header';
import Hero from './_components/hero';
import SpecialProducts from './_components/specialProducts';
import About from './_components/about';

const HomePage = () => {
    return (
        <>
            <Header />
            <Hero />
            <SpecialProducts />
            <About />
        </>
    );
};

export default HomePage;
