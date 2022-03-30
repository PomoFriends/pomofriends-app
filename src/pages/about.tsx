import React from 'react';
import Layout from '../components/elements/Layout';
import { showNotification } from '@mantine/notifications';
import { Button } from '@mui/material';

const about = ({}) => {
  return (
    <Layout>
      <Button
        onClick={() =>
          showNotification({
            id: 'hello-there',
            onClose: () => console.log('unmounted'),
            onOpen: () => console.log('mounted'),
            autoClose: 5000,
            title: "You've been compromised",
            message: 'Leave the building immediately',
            color: 'red',
            className: 'my-notification-class',
            loading: false,
          })
        }
      >
        Show notification
      </Button>
      about page
    </Layout>
  );
};

export default about;
