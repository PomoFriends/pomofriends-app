import SettingsForm from './PomodoroForm';
import GroupSettingsForm from './GroupPomodoroForm';
import AdminSettingsForm from './AdminPomodoroForm';
import {
  NotificationSettings,
  PomodoroSettings,
} from '../../utils/types/userTypes';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import NotificationsForm from './NotificationsForm';

interface SettingsTabsProps {
  settings: PomodoroSettings;
  notificationSettings: NotificationSettings;
  groupId?: string | null;
  admin?: boolean;
  handleClose: any;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({
  settings,
  notificationSettings,
  groupId,
  admin,
  handleClose,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Pomodoro" />
        <Tab label="Alarm" />
      </Tabs>
      {value === 0 ? (
        <>
          {groupId ? (
            admin === true ? (
              <AdminSettingsForm
                handleClose={handleClose}
                settings={settings}
                groupId={groupId!}
              />
            ) : (
              <GroupSettingsForm settings={settings} />
            )
          ) : (
            <SettingsForm handleClose={handleClose} settings={settings} />
          )}
        </>
      ) : (
        <>
          <NotificationsForm settings={notificationSettings} />
        </>
      )}
    </>
  );
};

export default SettingsTabs;
