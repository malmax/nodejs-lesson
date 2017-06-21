import React from 'react';
// require('es6-promise').polyfill();
if (!SERVER) {
  const fetch = require('whatwg-fetch');
} else {
  const fetch = require('isomorphic-fetch');
}

import Task from './Task.jsx';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    console.log('mounted', 'Tasks');
    fetch('/api/tasks')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        console.log(response);
        return response.json();
      })
      .then(response => this.setState({ tasks: response }));
  }

  render() {
    console.log('render', 'Tasks');

    return (
      <div>
        <h2>Не выполненные задачи:</h2>
        {this.state.tasks.map((elem, id) =>
          <Task
            id={id}
            key={elem.id + elem.title}
            title={elem.title}
            text={elem.text}
          />)}
      </div>
    );
  }
}
