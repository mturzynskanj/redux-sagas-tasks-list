import { fork, take, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from './api'
import { delay, channel } from 'redux-saga'


// export function* rootSaga() {
//     yield fork(watchFetchTasks);
//     yield fork(watchSomethingElse);
// }


// function* watchFetchTasks() {
//     while (true) {
//         yield take('FETCH_TASKS_STARTED');
//         try {
//             const { data } = yield call(api.fetchTasks);
//             yield put({
//                 type: 'FETCH_TASKS_SUCCEEDED',
//                 payload: { tasks: data }
//             })
//         } catch (e) {
//             yield put ({
//                 type: 'FETCH_TASKS_FAILED',
//                 payload: {error: e.message}
//             })

//         }
//     }
// }

export function* rootSaga() {
    // const action= yield take('FETCH_USER');
    yield takeLatest('DELETE_CONFIRMATION', deleteConfirmation);
    yield takeLatest('FETCH_TASKS_STARTED', fetchTasks);
    yield takeLatestById(['TIMER_STARTED', 'TIMER_STOPPED'], handleProgressTimer);
}


function* deleteConfirmation(action,args) {
    try {
        yield put({ 
            type: 'SHOW_MODAL',
            payload: action.payload
        });
        const userResponseToConfirmation = take(['CANCELED_MODAL', 'CONFIRMED']);
    } catch (e) {
        console.log('inside catch ...')
    }
}

function* fetchTasks() {
    try {
        const { data } = yield call(api.fetchTasks);
        yield put({
            type: 'FETCH_TASKS_SUCCEEDED',
            payload: { tasks: data }
        })
    } catch (e) {
        yield put({
            type: 'FETCH_TASKS_FAILED',
            payload: { error: e.message }
        })
    }
}

function* takeLatestById(actionType, saga) {
    const channelsMap = {};
    while (true) {
        const action = yield take(actionType);
        const { taskId } = action.payload;

        if (!channelsMap[taskId]) {
            channelsMap[taskId] = channel();
            yield takeLatest(channelsMap[taskId], saga);
        }
        yield put(channelsMap[taskId], action);
    }
}

function* handleProgressTimer({ payload, type }) {
    if (type === 'TIMER_STARTED') {
        while (true) {
            yield call(delay, 1000);
            yield put({
                type: 'TIMER_INCREMENT',
                payload: { taskId: payload.taskId }
            })
        }
    }
}


function* watchSomethingElse() {
    console.log('inside something else......');
}