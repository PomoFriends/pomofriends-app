import { Typography, Container, Box, Divider } from '@mui/material';
import React from 'react';
import Layout from '../components/elements/Layout';

const about = ({}) => {
  return (
    <Layout>
      <Container>
        <Box mt={2}>
          <Typography variant={'h5'} mb={2} color={'primary'}>
            A Pomodoro Timer with social features to improve your productivity
            and accountability
          </Typography>
          <Divider />
          <Typography variant={'h6'} my={2} color={'primary'}>
            What is PomoFriends?
          </Typography>
          <Typography variant={'body1'} mb={2}>
            PomoFriends is a productivity app inspired by Pomodoro Technique
            which is a time management method developed by Francesco Cirillo.
            PomoFriends aims to harbor a healthy and productive environment and
            encourage accountability amongst its users through social features
            that other Pomodoro apps do not have. By implementing aspects like
            messaging and task sharing, PomoFriends can help users be
            accountable, especially when done in a group.
          </Typography>
          <Typography variant={'body1'} mb={2}>
            With PomoFriends, users can create groups, invite friends or peers,
            list their tasks, set their timer as a group, and begin their timer.
            Furthermore, users in a group can message each other and see the
            activity of every participant. Through these functions and more,
            PomoFriends can add another level of productivity by incorporating
            accountability with its users.
          </Typography>
          <Divider />
          <Typography variant={'h6'} my={2} color={'primary'}>
            What is Pomodoro Technique?
          </Typography>
          <Typography variant={'body1'} mb={2}>
            The Pomodoro Technique is a time management method where a person
            sets a timer for a specified period - traditionally 25 minutes - and
            focuses on a single task during this timer. Once the 25 minutes are
            over, a 5-minute break occurs, and then the Pomodoro Technique
            repeats. Several studies have proven that the Pomodoro Technique
            helps increase productivity and encourages people to complete tasks
            without any distractions by having them focus on the task at hand.
          </Typography>
          <Divider />
          <Typography variant={'h6'} my={2} color={'primary'}>
            How to use PomoFriends?
          </Typography>
          <Typography variant={'body1'}>
            1. Join/Create a group or work by yourself
          </Typography>
          <Typography variant={'body1'}>
            2. Add tasks for your Pomodoro session
          </Typography>
          <Typography variant={'body1'}>3. Select a task to work on</Typography>
          <Typography variant={'body1'}>
            4. Start Pomodoro and focus on the task
          </Typography>
          <Typography variant={'body1'}>5. Take a break</Typography>
          <Typography variant={'body1'}>6. Repeat 3-5</Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default about;
