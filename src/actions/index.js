import * as api from '../api';

let _id = 1;

export function uniqueId() {
    return _id++;
}

function fetchTasksStarted() {
    return {
        type: 'FETCH_TASKS_STARTED'
    }
}

function fetchTasksFailed(error) {
    return {
        type: 'FETCH_TASKS_FAILED',
        payload: {
            error
        }
    }
}



export function createTask({ title, description, status = 'unstarted' }) {
    return dispatch => {
        api.createTask({ title, description, status }).then(resp => {
            dispatch(createTaskSucceeded(resp.data))
        })
    }
}

export function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task
        }
    }
}

export function fetchTasks() {
    return dispatch => {
        dispatch(fetchTasksStarted())
        api.fetchTasks().then(resp => {
            setTimeout(() => {
                dispatch(fetchTasksSucceeded(resp.data))
            }, 2000)
            // throw new Error(' not able to load data')
        })
            .catch(err => {
                console.log('+++++++inside the catch.....', err);
                dispatch(fetchTasksFailed(err.message))
            })
    }
}

export function fetchTasksSucceeded(tasks) {
    console.log('what is response data ', tasks);
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }
}

function editedTaskSucceeded(task) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {
            task
        }
    }
}

export function editTask(id, params = {}) {
    return (dispatch, getState) => {
        const task = getTaskById(getState().tasks.tasks, id);
        const updatedTask = Object.assign({}, task, params)
        api.editTask(id, updatedTask).then(resp => {
            dispatch(editedTaskSucceeded(resp.data))
        })
    }
}


function getTaskById(tasks, id) {
    return tasks.find(task => task.id === id);
}



// export function editTask(id,{params}){
//     return dispatch => {
//         api.editTask()
//     }
// }


