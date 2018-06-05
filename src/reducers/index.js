import { uniqueId } from '../actions'

// const mockTasks = [
//     {
//         id: uniqueId(),
//         title: 'React',
//         description: 'learn react',
//         task: 'learn react',
//         status: 'completed'
//     }, {
//         id: uniqueId(),
//         title: "Redux",
//         description: 'learn Redux',
//         task: 'learn redux',
//         status: 'completed'

//     }, {
//         id: uniqueId(),
//         title: "Mobx",
//         description: 'Learn Mobx',
//         task: 'learn mobx',
//         status: 'in-progress'
//     }, {
//         id: uniqueId(),
//         title: "SQL",
//         description: 'learn SQL',
//         task: 'learn sql',
//         status: 'unstarted'
//     }, {
//         id: uniqueId(),
//         title: "Styled - Components",
//         description: 'learn SQL',
//         task: 'learn sql',
//         status: 'in-progress'
//     }

// ]

// export default function tasks(state = {tasks:[]}, action) {
//     if (action.type === 'CREATE_TASK') {
//         return { tasks: state.tasks.concat(action.payload) };
//         return state;
//     }
//     if (action.type === 'EDIT_TASK') {
//         const { payload } = action;
//         return {
//             tasks: state.tasks.map(task => {
//                 if (task.id === payload.id) {
//                     return Object.assign({}, task, payload.params)
//                 }
//                 return task;
//             })

//         }
//         return state;
//     }

//     if (action.type === 'FETCH_TASKS_SUCCEEDED') {
//         console.log('what is the action ', action);
//         return {
//             tasks: action.payload.tasks
//         }
//         return state;
//     }

//     console.log('what is the state', state)
//     return state;
// }

const initialState = {
    tasks: [],
    isLoading: false,
    error:null
};


export default function tasks(state = initialState, action) {
    console.log('state is ', state);
    switch (action.type) {
        case 'FETCH_TASKS_FAILED':{
            return {
                ...state,
                isLoading:false, 
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
            console.log('inside edit task succeeded ', action);
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
            return {
                ...state,
                tasks: action.payload.tasks,
                isLoading: false
            }
        }

        default: {
            return state;
        }
    }
}