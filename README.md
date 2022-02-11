# PomoFriends ⏳📖👥

## Project Description

### Background & Problem Statement

The Pomodoro Technique is a time management method where a person sets a timer for a specified period – traditionally 25 minutes – and focuses on a single task during this timer. Once the 25 minutes are over, a 5-minute break occurs, and then the Pomodoro Technique repeats. Several studies have proven that the Pomodoro Technique helps increase productivity and encourages people to complete tasks without any distractions by having them focus on the task at hand.

Presently, numerous apps and web applications are available for the Pomodoro Technique. However, as we have found, many of them lack social features. Only a tiny handful of them allow the possibility of having groups, but even then, these applications do not have any social aspects like chat boxes or even group hosting. This is where PomoFriends comes in.

### Solution

PomoFriends is a new web application that aims to harbor a healthy and productive environment and encourage accountability amongst its users through social features that other Pomodoro apps do not have. By implementing aspects like messaging and task sharing in a productivity app, PomoFriends can help users be accountable, especially when done with others or in a group.

With our application, users can create groups, invite friends or peers, list their tasks, set their timers individually or as a group, and begin their timers. During breaks, users in a group can message each other, set up or edit existing tasks, and have the option to alter timers. On the other hand, during a “focus” session, users in a group will not be able to chat with one another but instead view others’ current task and their remaining time. Disabling chat during this time removes a distraction, and accountability among group members is boosted by having timers and the focused task of others visible. Through these functions and more, PomoFriends can add another level of productivity by incorporating accountability with its users.

### Project Objectives

WebApp aspects:

- Easily Accessible
- Appealing UI

Pomodoro aspects:

- Time management
- Manage distractions
- Maintain motivation
- Logs

Social aspects:

- Increase accountability
- Encouraging group learning
- Interactive
- View and share progress

### Target audience

Individuals who want to make use of their time and increase productivity

### Features

Timer

- Start
- Stop
- Reset
- Skip Pomodoro/Break
- Change timer type
  - Pomodoro/Short break/Long Break

Settings

- Adjust timers
  - Pomodoro
  - Short Break
  - Long Break
- Set Long Break interval
- Set automatic timers
  - Automatically start Pomodoro after Break
  - Automatically start Break after Pomodoro
- Alarms and Sounds
  - Sound options
  - Adjust volume
  - Clock tick sounds
    - When the timer is close to the end
- Notifications
  - Allow browser to show notifications

Tasks

- Create task
  - Name task
  - Describe the task
  - The number of Pomodoro sessions task will last for
  - Add type
- Edit
- Delete
- Show list of tasks
  - Save a list of tasks as a template
  - Load a template of tasks
  - Delete completed Tasks
  - Delete all Tasks
- Categorization
  - Sort tasks by type
- Reorder tasks

Chat/Group

- List of the groups
- Create a group
  - Async
    - Individual timers per participant
  - Sync
    - The timer is shared across all participants
      - The creator of the group decided on a time
- Join a group
  - Message exchange
  - Participants list
    - View their current tasks
    - View their timer
    - View how long they have been in a group
    - View their profile
  - Mute user
  - When Pomodoro starts, hide the chat
    - Automatically disable chat and switch to the participant list
    - Show chat once on a break or idle
  - Kick user
    - If sync, head of group kicks
    - If async, majority vote
- When the owner of the group leaves, assign a new owner
- Group is deleted once every member leaves

User

- Register, Login, Logout
  - Google/Github auth
- Settings
  - Customization
    - Change display name
    - Display name color in chat/group
  - Privacy
    - Visibility settings
      - Tasks
      - Timer
      - Activity
- View personal record/log/report
  - Time spent in Pomodoro timer
  - Tasks completed
    - Detailed report:
      - Time completed
      - How long did the task take to complete
  - Days accessed on application
  - Day Streak

Extra

- Ranking system
  - Weekly leaders
    - Display users with the most cumulative Pomodoro time for the week
      - Profile picture
      - Username
      - Cumulative Pomodoro time
    - Update every week
- Stickers for the chat
- Give a prompt after # of Pomodoros that asks you to rate your productivity
  - Scale from 1-5
  - Depending on the rating, either increase or decrease the timer accordingly
- Achievements

### Incentive

Social incentive

- Show other users’ timers and tasks in a group
- Accountability with others
- Leaderboard

Personal incentive

- Time management
- Task management
- Report
  - Time focused
  - Tasks completed
  - Other stats to encourage app use
- Achievements
- Promote productivity

### Rules

- Can’t chat during Pomodoro session
- No spam
  - A timer of when the last message was sent
  - Prevents sending repeated messages within a short time period
- No harassment
  - Group participants can report bad actors
  - Filter
    - Removes inappropriate messages
- Users can only join one group

## Technologies

- Language: TypeScript
- Framework: React.js, Next.js
- Hosting: Vercel
- API: Firebase, Firebase Functions
- Database: Firestore

## Timeline

| Sprint           | Feature           |
| ---------------- | ----------------- |
| Jan 23 - Feb 5   | User Account      |
|                  | Pomodoro Timer    |
|                  | Pomodoro Settings |
|                  | Tasks             |
| Feb 6 - Feb 19   | User profile      |
|                  | Groups            |
|                  | Chat              |
| Feb 20 - Mar 5   | Report            |
|                  | Leaderboard       |
| Mar 6 - Mar 19   | Design            |
|                  | Chores            |
|                  | Achievements      |
| Mar 20 - April 2 | Testing           |
|                  | Fixing bugs       |
|                  | Host              |

## Risks

Bad actors in the group

## Project Deliverables

### Social

- Creating groups
- Chat in a group
- Show timer and tasks of a user in a group
- Show users statistics
- Leaderboard

### Data

- Pomodoro Settings
- Tasks
- Achievements
- Statistics

### Security

Protecting personal information (full names, emails, etc.)

## Testing

### User Experience

During the testing phase of the project, a link to the web application will be distributed to peers to gather insight into their experience and any critiques or bugs found while using the app.

Our team will include a survey into the app to gather feedback from the users on their experience using it. Users will be able to report any bugs and other complications through this survey. This can be done as a prompt/pop-up that is shown to the user after their timer is completed and through a feedback window or link.

### Features to be tested

- Authentication
- User Settings
- Pomodoro Settings
- Pomodoro Timer
- CRUD for Tasks
- Group/Chat
- Report
