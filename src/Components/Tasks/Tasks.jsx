import React from 'react';
import Task from './Task';
import AddTask from './AddTask';

require('whatwg-fetch');

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    if (!SERVER && window.___INITIAL_STATE___) {
      this.state = {
        tasks: window.___INITIAL_STATE___ || [],
      };
    } else {
      this.state = {
        tasks: this.props.initial || [],
      };
    }
  }

  componentDidMount() {
    fetch('/api/tasks')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(response => this.setState({ tasks: response }));
  }

  handleClick = (e) => {
    const id = e.target.id;
    e.preventDefault();

    fetch(`/api/tasks/${id}`, {
      method: 'PUT',
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

      const tasks = this.state.tasks.slice().map((elem) => {
        if (elem.id == id) { elem.completed = 1; }
        return elem;
      });
      this.setState({ tasks });
    });
  }

  addTask = (e) => {
    // e.preventDefault();

    fetch('/api/tasks/add', {
      method: 'POST',
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

      const tasks = this.state.tasks.slice().map((elem) => {
        if (elem.id == id) { elem.completed = 1; }
        return elem;
      });
      this.setState({ tasks });
    });
  }

  render() {
    return (
      <div>
        <h2>Не выполненные задачи:</h2>
        {this.state.tasks.filter(elem => !elem.completed).map((elem, num) =>
          <Task
            id={elem.id}
            num={num}
            key={elem.id + elem.title}
            title={elem.title}
            text={elem.text}
            completed={elem.completed || false}
            handleClick={this.handleClick}
          />)}

        <h2>Выполненные задачи:</h2>
        {this.state.tasks.filter(elem => elem.completed).map((elem, num) =>
          <Task
            id={elem.id}
            num={num}
            key={elem.id + elem.title}
            title={elem.title}
            text={elem.text}
            completed={elem.completed || false}
          />)}

        <AddTask onSubmit={this.addTask} />
      </div>
    );
  }
}
