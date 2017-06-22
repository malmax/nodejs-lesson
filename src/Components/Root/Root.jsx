import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Link from '../Link';

export default function Root(props) {
  let tag = {};
  if (SERVER) {
    tag = (<div
      style={{
        position: 'fixed',
        padding: 5,
        top: 0,
        color: 'white',
        left: 0,
        backgroundColor: 'darkred',
      }}
    >SERVER RENDER</div>);
  } else {
    tag = (<div
      style={{
        position: 'fixed',
        top: 0,
        padding: 5,
        color: 'black',
        left: 0,
        backgroundColor: 'green',
      }}
    >CLIENT RENDER</div>);
  }

  return (
    <div>
      {tag}
      <Row>
        {[
          { title: 'Home',
            url: '/',
          },
          { title: 'Задачи',
            url: '/tasks',
          },
          {
            title: 'Не зайти без авторизации',
            url: '/restrict/area',
          },
          {
            title: 'Логин',
            url: '/auth/login',
          },
          {
            title: 'Logout',
            url: '/api/auth/logout',
          },
        ].map((obj, id) => {
          return (
            <Col xs={2} key={obj.title + id.toString()}>
              <Link to={obj.url} history={props.history} key={`${obj.title + id.toString()}link`}>
                {obj.title}
              </Link>
            </Col>);
        })}
      </Row>

      {props.children}
    </div>
  );
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
};
