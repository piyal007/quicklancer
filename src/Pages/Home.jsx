import React from 'react';
import Banner from '../Components/Banner';
import FeaturedTasks from '../Components/FeaturedTasks';
import Category from '../Components/Category';
import TopFreelancer from '../Components/TopFreelancer';
import Testimonials from '../Components/Testimonials';
import { Slide } from 'react-awesome-reveal';
import { useTheme } from '../Providers/ThemeProvider';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme={theme}>
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
        <Testimonials />
      </Slide>
      <Slide>
        <TopFreelancer />
      </Slide>
    </div>
  );
};

export default Home;