import React from 'react';
import Task from './Task';

const fetch = require('whatwg-fetch');


if (SERVER) {
  console.log('SERVER');
} else {
  console.log('CLIENT');
}
// } else {
//   const fetch = require('isomorphic-fetch');
// }

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    if (!SERVER && window.___INITIAL_STATE___) {
      this.state = {
        tasksToComplete: window.___INITIAL_STATE___ || [],
      };
    } else {
      this.state = {
        tasksToComplete: this.props.initial || [],
      };
    }
  }

  componentDidMount() {
    fetch('/api/tasks')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        console.log(response);
        return response.json();
      })
      .then(response => this.setState({ tasksToComplete: response }));
  }

  render() {
    return (
      <div>
        <h2>Не выполненные задачи:</h2>
        {this.state.tasksToComplete.map((elem, id) =>
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
