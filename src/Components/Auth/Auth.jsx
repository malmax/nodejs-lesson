import React from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Col,
    Checkbox,
    Button,
    ControlLabel } from 'react-bootstrap';


export default function LoginForm() {
  return (
    <Form horizontal>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
            Email
        </Col>
        <Col sm={10}>
          <FormControl type="email" placeholder="Email" />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Пароль
        </Col>
        <Col sm={10}>
          <FormControl type="password" placeholder="Password" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Checkbox>Запомнить меня</Checkbox>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Залогиниться
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
}
