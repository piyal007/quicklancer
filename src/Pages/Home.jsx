import React from 'react';
import Banner from '../Components/Banner';
import FeaturedTasks from '../Components/FeaturedTasks';
import Category from '../Components/Category';
import TopFreelancer from '../Components/TopFreelancer';
import { Fade, Slide } from 'react-awesome-reveal';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Fade>
        <Banner />
      </Fade>
      <Slide direction="right">
        <FeaturedTasks />
      </Slide>
      <Fade delay={200}>
        <Category />
      </Fade>
      <Slide direction="left" delay={200}>
        <TopFreelancer />
      </Slide>
    </div>
  );
};

export default Home;