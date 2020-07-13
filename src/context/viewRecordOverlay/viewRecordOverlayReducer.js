import { SHOW_VIEW_OVERLAY, HIDE_VIEW_OVERLAY, SHOW_VIEW_PRELOADER, HIDE_VIEW_PRELOADER, FETCH_VIEW_RECORDS, ADD_VIEW_RECORD, REMOVE_VIEW_RECORD, SHOW_VIEW_FORM, HIDE_VIEW_FORM, ADD_RECORD_ID } from "../types"

const handlers = {
    [ADD_RECORD_ID]: (state, { id }) => ({ ...state, recordId: id }),
    [SHOW_VIEW_OVERLAY]: state => ({ ...state, visible: true }),
    [HIDE_VIEW_OVERLAY]: state => ({ ...state, visible: false }),
    [SHOW_VIEW_PRELOADER]: state => ({ ...state, preloader: true }),
    [HIDE_VIEW_PRELOADER]: state => ({ ...state, preloader: false }),
    [FETCH_VIEW_RECORDS]: (state, { payload }) => ({ ...state, viewRecords: payload }),
    [ADD_VIEW_RECORD]: (state, { payload }) => ({ ...state, viewRecords: [...state.viewRecords, payload] }),
    [REMOVE_VIEW_RECORD]: (state, { payload }) => ({ ...state, viewRecords: state.viewRecords.filter(record => record.id !== payload) }),
    [SHOW_VIEW_FORM]: state => ({ ...state, viewForm: true }),
    [HIDE_VIEW_FORM]: state => ({ ...state, viewForm: false }),
    DEFAULT: state => state
}

export const viewRecordOverlayReducer = (state, action) => {
    const handle = handlers[action.type || handlers.DEFAULT]
    return handle(state, action)
}