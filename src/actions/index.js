import * as api from '../api';

let _id = 1;

export function uniqueId() {
    return _id++;
}

export function fetchTasksStarted() {
    return {
        type: 'FETCH_TASKS_STARTED'
    }
}

function progressTimerStart(taskId){
    return {
        type: 'TIMER_STARTED',
        payload:{taskId}
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

function createTaskFailed(error){
    return {
        type:'CREATE_TASK_FAILED',
        payload:{
            error
        }
    }
}

export function createTask({ title, description, status = 'unstarted', timer=0 }) {
    return dispatch => {
        api.createTask({ title, description, status, timer})
        .then(resp => {
            dispatch(createTaskSucceeded(resp.data))
        })
        .catch(err=>{
            dispatch(createTaskFailed(err.message))
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

export function showModal({show, task}){
    return {
        type:'SHOW_MODAL',
        payload:{
            show,
            task
        }
    }
}

export function canceledModal(){
    return {
        type: 'CANCELED_MODAL',
        payload: {
            show: false,
            task: null
        }
    }
}

export function filterTasks(searchTerm){
    return {
        type: 'FILTER_TASKS',
        payload:{searchTerm}
    }
}



// export function fetchTasks() {
//     return dispatch => {
//         dispatch(fetchTasksStarted())
//         api.fetchTasks().then(resp => {
//             setTimeout(() => {
//                 dispatch(fetchTasksSucceeded(resp.data))
//             }, 2000)
//             // throw new Error(' not able to load data')
//         })
//             .catch(err => {
//                 console.log('+++++++inside the catch.....', err);
//                 dispatch(fetchTasksFailed(err.message))
//             })
//     }
// }

export function fetchTasksSucceeded(tasks) {
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
            if(resp.data.status === 'in-progress'){
                dispatch(progressTimerStart(resp.data.id))
            }
            if(task.status ==='in-progress'){
                return dispatch(progressTimerStop(resp.data.id))
            }
        })
    }
}

function progressTimerStop(taskId){
    return {type: 'TIMER_STOPPED',  payload: {taskId}}
}

function getTaskById(tasks, id) {
    return tasks.find(task => task.id === id);
}

// export function editTask(id,{params}){
//     return dispatch => {
//         api.editTask()
//     }
// }


