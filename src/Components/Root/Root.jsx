import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import Link from '../Link';

export default class Root extends React.Component {

  constructor(props) {
    super(props);

    console.log(props);
  }

  getChildContext() {
    return { history: this.props.history };
  }

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <Row>
          {[
            { title: 'Home',
              url: '/',
            },
          ].map((obj, id) => {
            return (
              <Col xs={2} key={obj.title + id.toString()}>
                <Link to={obj.url} key={`${obj.title + id.toString()}link`}>
                  {obj.title}
                </Link>
              </Col>);
          })}
        </Row>

        {props.children}
      </div>
    );
  }
}
