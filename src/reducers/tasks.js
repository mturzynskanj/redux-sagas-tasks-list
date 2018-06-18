import { uniqueId } from '../actions'

const initialState = {
    tasks: [],
    isLoading: false,
    error: null,
    searchTerm: ''
};

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USER': {
            console.log('inside fetch user....');
            return state
        }

        case 'FETCH_TASKS_FAILED': {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        }

        case 'FETCH_TASKS_STARTED': {
            return {
                ...state,
                isLoading: true
            }
        }

        case 'CREATE_TASK_SUCCEEDED': {
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.concat(action.payload.task)
            }
        }

        case 'EDIT_TASK_SUCCEEDED': {
            const { payload } = action;
            return {
                tasks: state.tasks.map(task => {
                    if (task.id === payload.task.id) {
                        return Object.assign({}, task, payload.task)
                    }
                    return task
                })
            }
            return {
                ...state,
                tasks: tasks
            }
        }

        case 'FETCH_TASKS_SUCCEEDED': {
            console.log('inside succeeded...')
            return {
                ...state,
                tasks: action.payload.tasks,
                isLoading: false
            }
        }

        case 'TIMER_INCREMENT': {
            const tasks = state.tasks.map(task => {
                if (task.id === action.payload.taskId) {
                    return { ...task, timer: task.timer + 1 }
                }
                return task;
            })
            return { ...state, tasks: tasks }
        }

        case 'FILTER_TASKS': {
            return {
                ...state,
                searchTerm: action.payload.searchTerm
            }
        }

        default: {
            return state;
        }
    }
}