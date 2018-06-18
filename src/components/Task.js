import React from 'react'
import styled from 'styled-components'

let TaskWrapper = styled.div`
    padding: 25px;
    border: 1px solid #cdcdcd;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    background-color: #DCEDC8;
    box-shadow: 1px 1px 1px rgba(0,0,0,.2);
    min-width: 250px; 
`;

let TaskHeader = styled.h3`
     color: blue;
     border-bottom: 1px solid #666;
     padding-bottom: 10px;
`;

let TaskBody = styled.div`
    font-size: 14px
    padding: 5px; 
`;

let Button = styled.button`
    padding: 3px;
    color: red;
    width: 80px;
    border-radius: 3px;
    background-color:rgba(255,0,0, .25)
`;

const TASK_STATUSES = ['unstarted', 'in-progress', 'completed'];

const Task = (props) => {
    return (
        <TaskWrapper>
            <select value={props.task.status} onChange={onStatusChange}>
                {
                    TASK_STATUSES.map(status => {
                        return <option key={status} value={status}>{status}</option>
                    })
                }
            </select>
            <p>{props.task.status}</p>
            <TaskHeader>{props.task.title}</TaskHeader>
            <TaskBody>{props.task.description} <p>{props.task.timer}s </p></TaskBody>
            {/* <Button onClick={() => onDeleteTask(props.task.id)}>Delete Task {props.task.id}</Button> */}
        </TaskWrapper>
    );

    function onDeleteTask(id) {
        props.showModal(id);
    }

    function onStatusChange(e) {
        props.onStatusChange(props.task.id, e.target.value)
    }
}

export default Task;