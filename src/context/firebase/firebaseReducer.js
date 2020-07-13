import { ADD_RECORD, REMOVE_RECORD, FETCH_RECORD, SHOW_PRELOADER, HIDE_PRELOADER } from '../types'

const handlers = {
    [SHOW_PRELOADER]: state => ({ ...state, preloader: true }),
    [HIDE_PRELOADER]: state => ({ ...state, preloader: false }),
    [ADD_RECORD]: (state, { payload }) => ({
        ...state,
        records: [...state.records, payload]
    }),
    [REMOVE_RECORD]: (state, { payload }) => ({
        ...state,
        records: state.records.filter(record => record.id !== payload)
    }),
    [FETCH_RECORD]: (state, { payload }) => ({ ...state, records: payload }),
    DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type || handlers.DEFAULT]
    return handle(state, action)
}