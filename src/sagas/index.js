// Imports: Dependencies
import { all, fork} from 'redux-saga/effects';
// Imports: Redux Sagas
import { watchSignup, watchDecreaseCounter, watchAddProfile, watchGetProfile } from './counterSaga';
// Redux Saga: Root Saga
export function* rootSaga () {
  yield all([
    fork(watchSignup),
    fork(watchDecreaseCounter),
    fork(watchAddProfile),
    fork(watchGetProfile),
  ]);
};