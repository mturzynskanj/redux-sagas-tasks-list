import { uniqueId } from '../actions'

const mockTasks = [
    {
        id: uniqueId(),
        title: 'React',
        description: 'learn react',
        task: 'learn react',
        status: 'completed'
    }, {
        id: uniqueId(),
        title: "Redux",
        description: 'learn Redux',
        task: 'learn redux',
        status: 'completed'

    }, {
        id: uniqueId(),
        title: "Mobx",
        description: 'Learn Mobx',
        task: 'learn mobx',
        status: 'in-progress'
    }, {
        id: uniqueId(),
        title: "SQL",
        description: 'learn SQL',
        task: 'learn sql',
        status: 'unstarted'
    }, {
        id: uniqueId(),
        title: "Styled - Components",
        description: 'learn SQL',
        task: 'learn sql',
        status: 'in-progress'
    }

]

export default function tasks(state = { tasks: mockTasks }, action) {
    if (action.type === 'CREATE_TASK') {
        return { tasks: state.tasks.concat(action.payload) };
    }
    if (action.type === 'EDIT_TASK') {
        const { payload } = action;
        return {
            tasks: state.tasks.map(task => {
                if (task.id === payload.id) {
                    return Object.assign({}, task, payload.params)
                }
                return task;
            })
        }
    }

    console.log('what is the state', state)
    return state;
}