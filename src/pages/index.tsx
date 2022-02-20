import React from 'react';
import Pomodoro from '../components/pomodoro/Pomodoro';

/**
 *
 * @return {JSX.Element}
 *
 * Landing page
 */
const HomePage: React.FC = (): JSX.Element => {
  // return <div className="flex rounded-lg p-24 justify-center">Home page</div>;
  return <Pomodoro />;
};

export default HomePage;
