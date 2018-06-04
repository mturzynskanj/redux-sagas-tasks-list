import React from 'react'

import Task from './Task'
import TaskList from './TaskList'

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


//let result = TASK_STATUSES.map(status => list.filter(item => item.status === status))

class TasksPage extends React.Component {

    constructor(props) {
        console.log('task page props', props);
        super(props);
        this.state = {
            showNewCardForm: false,
            title: '',
            description: ''
        }
        this.toggleForm = this.toggleForm.bind(this)
    }

    renderTaskLists() {
        const { tasks } = this.props;
        return TASK_STATUSES.map(status => {
            const filteredTasks = tasks.filter(item => item.status === status);
            return <TaskList key={status} tasks={filteredTasks} status={status} onStatusChange = {this.props.onStatusChange}/>
        }
        )
    }

    onCreateTask = (e) => {
        e.preventDefault();
        console.log('this state title', this.state.title);
        console.log('this state descriptiopn', this.state.description)
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

    toggleForm() {
        this.setState({
            showNewCardForm: !this.state.showNewCardForm
        })
        console.log('showNewCardForm ', this.state)
    }

    render() {
        return (
            <div>
                <TasksListHeader>Tasks List </TasksListHeader>
                <SubHeader>
                    <button onClick={this.toggleForm}>Add Task</button>
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

export default TasksPage