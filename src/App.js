import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';

import styled from 'styled-components'

import TasksPage from './components/TasksPage'

import { createTask, editTask, fetchTasks } from './actions/index'

class App extends Component {
  onCreateTask = (title, description) => {
    this.props.dispatch(createTask(title, description))
  }

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }))
  }

  render() {
    return (
      <div className="App">
        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
          onStatusChange={this.onStatusChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

function mapDispatchToProps(dispatch){
  fetchTasks: dispatch(fetchTasks)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
