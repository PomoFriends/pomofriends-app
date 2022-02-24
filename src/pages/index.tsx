import React from 'react';
import Layout from '../components/elements/Layout';
import Pomodoro from '../components/pomodoro/Pomodoro';

/**
 *
 * @return {JSX.Element}
 *
 * Landing page
 */
const HomePage: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Pomodoro />
    </Layout>
  );
};

export default HomePage;
