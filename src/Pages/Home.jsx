import React from 'react';
import Banner from '../Components/Banner';
import FeaturedTasks from '../Components/FeaturedTasks';
import Category from '../Components/Category';
import TopFreelancer from '../Components/TopFreelancer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <FeaturedTasks />
      <Category />
      <TopFreelancer/>
    </div>
  );
};

export default Home;