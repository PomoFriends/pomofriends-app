import { useRequireAuth } from '../hooks/useRequireAuth';

/**
 *
 * @return {JSX.Element}
 *
 * Dashboard page
 * Shows users info
 */
const DashboardPage: React.FC = (): JSX.Element => {
  const { user } = useRequireAuth();

  let body = null;

  if (!user) {
    body = <></>;
  } else {
    body = (
      <div className="min-h-screen flex bg-gray-200">
        logged in as {user.username}
      </div>
    );
  }

  return body;
};

export default DashboardPage;
