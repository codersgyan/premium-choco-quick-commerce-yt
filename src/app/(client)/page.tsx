import React from 'react';
import Header from './_components/header';
import Hero from './_components/hero';
import SpecialProducts from './_components/specialProducts';
import About from './_components/about';
import NewsLetter from './_components/newsletter';
import Footer from './_components/footer';

const HomePage = () => {
    return (
        <>
            <Header />
            <Hero />
            <SpecialProducts />
            <About />
            <NewsLetter />
            <Footer />
        </>
    );
};

export default HomePage;
