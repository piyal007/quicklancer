import React from 'react';
import Banner from '../Components/Banner';
import FeaturedTasks from '../Components/FeaturedTasks';
import Category from '../Components/Category';
import TopFreelancer from '../Components/TopFreelancer';
import { Fade, Slide } from 'react-awesome-reveal';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-base-100 text-base-content"
      data-theme="dark"
    >
      <Slide>
        <Banner />
      </Slide>
      <Slide>
        <FeaturedTasks />
      </Slide>
      <Slide>
        <Category />
      </Slide>
      <Slide>
        <TopFreelancer />
      </Slide>
    </div>
  );
};

export default Home;