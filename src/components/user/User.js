import React, { useEffect } from 'react';
import GitHub from '../../services/github';
import UserProfile from './components/userProfile';
import useState from '../../hooks/useState';

const User = (props) => {
  const [state, setState] = useState({
    isLoading: false,
    user: {},
    hasError: false,
  });

  useEffect(() => {
    const { match: { params: { name } } } = props;

    setState({
      isLoading: true,
    });

    GitHub.getUser(name)
      .then(response => {
        setState({
          isLoading: false,
          user: response.data,
        });
      })
      .catch(() => {
        setState({
          isLoading: false,
          hasError: true,
        });
      });
  }, []);

  const {
    user,
    isLoading,
    hasError,
  } = state;

  return (
    <UserProfile
      user={user}
      isLoading={isLoading}
      hasError={hasError}
    />
  );
}

export default User;
