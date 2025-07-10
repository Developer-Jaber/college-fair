
import CampusMapSection from '@/components/CampusMapSection';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
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

    {/* Campus Map section */}
    <CampusMapSection></CampusMapSection>
    </>
  );
}
