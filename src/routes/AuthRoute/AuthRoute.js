import LoginForm from '../../Components/Auth';

export default ({ db }) => {
  return ([
    {
      path: '/login',
      action: () => {
        return (
          <LoginForm />
        );
      },
    },
  ]);
};
