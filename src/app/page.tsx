
import CampusMapSection from '@/components/CampusMapSection';
import CollegeCards from '@/components/CollegeCards';
import CollegeReviews from '@/components/CollegeReviews';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import GraduateGallery from '@/components/GraduateGallery';
import Hero from '@/components/Hero';
import ResearchPapers from '@/components/ResearchPapers';
import Steps from '@/components/Steps';
import React from 'react';


export default function Home() {
  return (
    <>
    {/* Hero section */}
    <Hero></Hero>

    {/* Features section */}
    <Features></Features>

    {/* Steps section */}
    <Steps></Steps>

    {/* College Cards section */}
    <CollegeCards></CollegeCards>

    {/* Graduate Gallery section */}
    <GraduateGallery></GraduateGallery>

    {/* Research Papers section */}
    <ResearchPapers></ResearchPapers>

    {/* Campus Map section */}
    <CampusMapSection></CampusMapSection>

    {/* College Reviews section */}
    <CollegeReviews></CollegeReviews>

    {/* Footer section */}
    <Footer></Footer>
    </>
  );
}
