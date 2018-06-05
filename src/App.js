import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';

import styled from 'styled-components'

import TasksPage from './components/TasksPage'

import FlashMessage from './components/FlashMessage'

import { createTask, editTask, fetchTasks } from './actions/index'

class App extends Component {
  onCreateTask = (title, description) => {
    this.props.dispatch(createTask(title, description))
  }

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }))
  }

  componentDidMount() {
    console.log('inside component did mount .....')
    this.props.dispatch(fetchTasks());
  }

  render() {
    return (
      <div>
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="App">
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onStatusChange={this.onStatusChange}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, error } = state.tasks;
  return {
    tasks,
    isLoading,
    error
  }
}



export default connect(mapStateToProps)(App);
