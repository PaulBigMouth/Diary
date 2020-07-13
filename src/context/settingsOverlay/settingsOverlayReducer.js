import { SHOW_SETTINGS_OVERLAY, HIDE_SETTINGS_OVERLAY, FETCH_DATA, CHANGE_TITLE, CHANGE_DESCRIPTION, SHOW_SETTINGS_PRELOADER, HIDE_SETTINGS_PRELOADER } from "../types"

const handlers = {
    [SHOW_SETTINGS_PRELOADER]: state => ({ ...state, preloader: true }),
    [HIDE_SETTINGS_PRELOADER]: state => ({ ...state, preloader: false }),
    [SHOW_SETTINGS_OVERLAY]: state => ({ ...state, visible: true }),
    [HIDE_SETTINGS_OVERLAY]: state => ({ ...state, visible: false }),
    [FETCH_DATA]: (state, { payload }) => ({ ...state, ...payload }),
    [CHANGE_TITLE]: (state, action) => ({ ...state, title: action.title }),
    [CHANGE_DESCRIPTION]: (state, action) => ({ ...state, description: action.description }),
    DEFAULT: state => state
}



export const settignsOverlayReducer = (state, action) => {
    const handle = handlers[action.type || handlers.DEFAULT]
    return handle(state, action)
}