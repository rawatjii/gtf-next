import React from 'react';
import CareerBanner from '../components/Career/CareerBanner';
import JobOpening from '../components/Career/JobOpening';

export default function CareerHome() {
  return (
    <div className="pt-[110px]">
      <CareerBanner/>
      <JobOpening/>
    </div>
  )
}
