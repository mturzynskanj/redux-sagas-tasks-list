import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';

import styled from 'styled-components'

import TasksPage from './components/TasksPage'

import FlashMessage from './components/FlashMessage'

import { ConfirmModal } from './components/ConfirmModal'

import { getGroupedAndFilteredTasks } from './reducers'

import { createTask, editTask, fetchTasksStarted, showModal, canceledModal, filterTasks } from './actions/index'

class App extends Component {
	onCreateTask = (title, description) => {
		this.props.dispatch(createTask(title, description))
	}

	onSearch = searchTerm => {
		this.props.dispatch(filterTasks(searchTerm));
	}

	onStatusChange = (id, status) => {
		this.props.dispatch(editTask(id, { status }))
	}

	showModal = (id) => {
		this.props.dispatch({ type: 'DELETE_CONFIRMATION', payload: { task: id, show: true } });
	}

	hideConfirm = () => {
		this.props.dispatch(canceledModal({ show: false, task: null }))
	}

	onContinue = () => {
		this.props.dispatch({
			type: 'CONFIRMED',
			payload: {
				task: this.props.showModal.task
			}
		})
	}

	componentDidMount() {
		this.props.dispatch(fetchTasksStarted());
	}

	render() {
		return (
			<div>
				{this.props.error && <FlashMessage message={this.props.error} />}
				<div className="App">
					{/* {this.props.showModal.show && <ConfirmModal onCancel={this.hideConfirm} onContinue={this.onContinue} />} */}
					<TasksPage
						tasks={this.props.tasks}
						onCreateTask={this.onCreateTask}
						onStatusChange={this.onStatusChange}
						isLoading={this.props.isLoading}
						onSearch={this.onSearch}
					//showModal={this.props.dispatch({type:'DELETE_CONFIRMATION'})}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { isLoading, error, showModal } = state.tasks;
	return {
		tasks : getGroupedAndFilteredTasks(state),
		isLoading,
		error
	}
}

export default connect(mapStateToProps)(App);
