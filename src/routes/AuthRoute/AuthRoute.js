import React from 'react';
import LoginForm from '../../Components/Auth/LoginForm';

export default ({ db }) => {
  return ([
    {
      path: '/login',
      action: () => {
        console.log('Login form');
        return ({
          title: 'Авторизация',
          data: <LoginForm />,
        });
      },
    },
  ]);
};
