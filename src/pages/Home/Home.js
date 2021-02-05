import React from 'react';
import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navigation/Navbar';
import Navlinks from '../../components/NavLinks/Navlinks';
import homeBannerImg from '../../images/bg.png';
import Feed from '../Feed/Feed';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Banner imgPath={homeBannerImg}/> 
            <Navlinks />
            <Feed />
        </div>
    )
}
