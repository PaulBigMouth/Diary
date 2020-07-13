import { OPEN_ADD_RECORD_OVERLAY, CLOSE_ADD_RECORD_OVERLAY } from '../types'

const handlers = {
    [OPEN_ADD_RECORD_OVERLAY]: (state) => ({ ...state, visible: true }),
    [CLOSE_ADD_RECORD_OVERLAY]: (state) => ({ ...state, visible: false }),
    DEFAULT: state => state
}


export const addRecordOverlayReducer = (state, action) => {
    const handle = handlers[action.type || handlers.DEFAULT]
    return handle(state, action)
}