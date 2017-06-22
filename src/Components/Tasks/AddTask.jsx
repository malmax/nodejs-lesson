import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

export default function AddTask(props) {
  return (
    <div>
      <h2>Добавить задачу</h2>
      <Form method="POST" action="/api/tasks/add">
        <Col xs={3}>
          <FormGroup controlId="formInlineName">
            <FormControl type="text" name="title" placeholder="Задача №1" />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup controlId="formInlineEmail">
            <FormControl type="text" name="text" placeholder="Что нужно сделать" />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <Button type="submit" onClick={props.onSubmit}>
            добавить задачу
          </Button>
        </Col>
      </Form>
    </div>
  );
}
