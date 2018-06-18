import React from 'react'
import Task from './Task'
import styled from 'styled-components'

let TaskListWrapper = styled.div`
    margin: 15px;
    display: flex;
    flex-direction: column;
`;

let Status = styled.div`
    font-size: 9px;
    color: blue;
    text-transform: uppercase;
    text-align: right;
    margin-bottom: 5px;
`;

const TaskList = props => {
    console.log('TaskLIst ', props.dispatch);
    return (
        <TaskListWrapper>
            <Status>{props.status}</Status>
            {props.tasks.map(task => <Task key={task.id} task={task} onStatusChange={props.onStatusChange}  />)}
        </TaskListWrapper>
    )
}

export default TaskList