import tasks from './tasks'
import showModal from './confirmModal'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { TASK_STATUSES } from '../constants'

const getTasks = state => state.tasks.tasks;
const getSearchTerm = state => state.tasks.searchTerm;

export const rootReducer = combineReducers({
    tasks: tasks,
    showModal: showModal
});

export const getFilteredTasks = createSelector(
    [getTasks, getSearchTerm],
    (tasks, searchTerm) => {
        return tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')))
    }
)

export const getGroupedAndFilteredTasks = createSelector(
    [getFilteredTasks],
    (tasks) => {
        const grouped = {};
        TASK_STATUSES.map(status => grouped[status] = tasks.filter(task => task.status === status))
        return grouped;
    }
)