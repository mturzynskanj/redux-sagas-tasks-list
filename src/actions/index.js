import * as api from '../api';


let _id = 1;

export function uniqueId() {
    return _id++;
}

export function createTask({ title, description }) {
    console.log('inside createTask action ', title, description);
    return {
        type: 'CREATE_TASK',
        payload: {
            id: uniqueId(),
            title,
            description,
            status: 'unstarted'
        }
    }
}

export function editTask(id, params = {}) {
    console.log('inside edit Task ....', params)
    return {
        type: 'EDIT_TASK',
        payload: {
            id,
            params
        }
    }
}


export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }
}


export function fetchTasks(dispatch) {
    return despatch => {
        api.fetchTasks().then(resp => {
            dispatch(fetchTasksSucceeded(resp.data))
        })
    }
}