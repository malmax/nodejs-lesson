import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import routes from './routes';
import Html from './Components/Html';

const server = express();

// используем роутер
server.get('*', (req, res) => {
  routes.resolve({ path: req.path }).then((result) => {
    const element = React.createElement(Html, {
      data: result.data,
      title: result.title,
    });
    res.send(ReactDOMServer.renderToStaticMarkup(element));
  }).catch(() => {
    res.status(404);
    // default to plain-text. send()
    res.type('txt').send('Page not found');
  });
});

server.listen(8090, () => {
  console.log('Listen 8090');
});
