import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default (props) => {
  return (
    <Row>
      <article>
        <Col xs={1}>{props.num + 1}</Col>
        <Col xs={3}>{props.title}</Col>
        <Col xs={5}>{props.text}</Col>
        <Col xs={2}>
          <Button
            bsStyle="success" id={props.id}
            onClick={props.handleClick}
            disabled={Boolean(props.completed)}
          >
            готово
          </Button>
        </Col>
      </article>
    </Row>
  );
};
