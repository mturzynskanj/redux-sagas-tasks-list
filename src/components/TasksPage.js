import React from 'react'
import Task from './Task'
import TaskList from './TaskList'
import { ConfirmModal } from './ConfirmModal'
import styled from 'styled-components'

let ListsContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 15px;
`;

let TasksListHeader = styled.h2`
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #666;
`;

let SubHeader = styled.div`
    display: flex;
    justify-content: center;
      input {
          margin-left: 30px;
          padding: 5px;
          border-radius: 3px;
      }
`;

let FormWrapper = styled.div`
    margin: 20px;
    padding: 20px;
    border: 1px solid #C0CA33;
    background-color: #E6EE9C;
    display: flex;
    justify-content: center;
        form {
            max-width: 80%;
        }
        input {
            margin-right: 10px;
            min-width: 200px;
            padding: 5px;
        }
`;

const TASK_STATUSES = ['unstarted', 'in-progress', 'completed'];

class TasksPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showNewCardForm: false,
            title: '',
            description: ''
        }
        this.toggleForm = this.toggleForm.bind(this)
    }

    renderTaskLists() {
        const { tasks, onStatusChange } = this.props;
        return Object.keys(tasks).map(status => {
            const taskByStatus = tasks[status];
            return (
                <TaskList
                    key={status}
                    status={status}
                    tasks={taskByStatus}
                    onStatusChange={onStatusChange}
                />
            )
        });
    }

    onCreateTask = (e) => {
        e.preventDefault();
        this.props.onCreateTask({
            title: this.state.title,
            description: this.state.description
        });
        this.resetForm();
    }

    resetForm = () => {
        this.setState({
            showNewCardForm: false,
            title: '',
            description: ''
        })
    }

    handleBtnClick = () => {
        console.log('clicked...')
    }

    onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value
        this.setState({
            [key]: value
        })
    }

    onSearch = (e) => {
        this.props.onSearch(e.target.value);
    }

    toggleForm() {
        this.setState({
            showNewCardForm: !this.state.showNewCardForm
        })
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div>Loading ....</div>
            )
        } else {
            return (
                <div>
                    <TasksListHeader>Tasks List </TasksListHeader>
                    <SubHeader>
                        <button onClick={this.toggleForm}>Add Task</button> <input onChange={this.onSearch} type="text" placeholder="Search..." />
                    </SubHeader>
                    {this.state.showNewCardForm && (
                        <FormWrapper>
                            <form onSubmit={this.onCreateTask}>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    type='text'
                                    placeholder="task title"
                                    name='title'
                                />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    type="text"
                                    placeholder="task description"
                                    name='description'
                                />

                                <button
                                    type='submit'
                                >
                                    Save Task
                            </button>
                            </form>
                        </FormWrapper>
                    )}
                    <ListsContainer>
                        {this.renderTaskLists()}
                    </ListsContainer>
                </div>
            )
        }
    }
}

export default TasksPage