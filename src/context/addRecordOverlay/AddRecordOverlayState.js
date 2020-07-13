import React, { useReducer } from 'react'
import { addRecordOverlayContext } from './addRecordOverlayContext'
import { addRecordOverlayReducer } from './addRecordOverlayReducer'
import { OPEN_ADD_RECORD_OVERLAY, CLOSE_ADD_RECORD_OVERLAY } from '../types'


export const AddRecordOverlayState = ({ children }) => {
    const [state, dispatch] = useReducer(addRecordOverlayReducer, { visible: false })

    const show = () => {
        dispatch({
            type: OPEN_ADD_RECORD_OVERLAY
        })
    }
    const hide = () => {
        dispatch({
            type: CLOSE_ADD_RECORD_OVERLAY
        })
    }

    return (
        <addRecordOverlayContext.Provider value={{
            show, hide, overlay: state
        }}>
            {children}
        </addRecordOverlayContext.Provider>
    )
}