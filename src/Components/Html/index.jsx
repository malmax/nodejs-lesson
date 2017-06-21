import React from 'react';
import { Grid } from 'react-bootstrap';

export default (props) => {
  return (
    <html lang="en">
      <head>
        <title>{props.title} | MySite</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous" />
      </head>
      <body>
        <Grid>
          <div id="root">
            {props.data}
          </div>
        </Grid>
        <script src="/public/client.js" />
      </body>
    </html>
  );
};
