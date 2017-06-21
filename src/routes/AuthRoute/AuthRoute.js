import React from 'react';
import LoginForm from '../../Components/Auth/LoginForm';

export default () => {
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
