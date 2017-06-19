import React from 'react';
import LoginForm from '../../Components/Auth';

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
