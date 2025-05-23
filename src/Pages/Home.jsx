import React from 'react';
import Banner from '../Components/Banner';
import FeaturedTasks from '../Components/FeaturedTasks';
import Category from '../Components/Category';
import TopFreelancer from '../Components/TopFreelancer';
import { Fade, Slide } from 'react-awesome-reveal';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Slide direction="right" delay={200}>
        <Banner />
      </Slide>
      <Slide direction="left" delay={200}>
        <FeaturedTasks />
      </Slide>
      <Slide direction="right" delay={200}>
        <Category />
      </Slide>
      <Slide direction="left" delay={200}>
        <TopFreelancer />
      </Slide>
    </div>
  );
};

export default Home;