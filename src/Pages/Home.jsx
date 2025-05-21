import React from 'react';
import Banner from '../Components/Banner';
import RecentTasks from '../Components/RecentTasks';
import Category from '../Components/Category';
import TopFreelancer from '../Components/TopFreelancer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <RecentTasks />
      <Category />
      <TopFreelancer/>
    </div>
  );
};

export default Home;