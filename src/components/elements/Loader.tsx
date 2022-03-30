import { Loader, Center } from '@mantine/core';

const LoadingScreen: React.FC = (): JSX.Element => {
  return (
    <Center>
      <Loader color="violet" size="xl" variant="dots" />
    </Center>
  );
};

export default LoadingScreen;
