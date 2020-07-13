import React, { useReducer } from "react"
import { viewRecordOverlayContext } from "./viewRecordOverlayContext"
import { viewRecordOverlayReducer } from "./viewRecordOverlayReducer"
import { SHOW_VIEW_OVERLAY, HIDE_VIEW_OVERLAY, SHOW_VIEW_PRELOADER, HIDE_VIEW_PRELOADER, FETCH_VIEW_RECORDS, USERID, ADD_VIEW_RECORD, REMOVE_VIEW_RECORD, SHOW_VIEW_FORM, HIDE_VIEW_FORM, ADD_RECORD_ID } from "../types"
import Axios from "axios"



export const ViewRecordOverlayState = ({ children }) => {
    const initialState = {
        visible: false,
        preloader: true,
        viewRecords: [],
        viewForm: false,

    }

    const [state, dispatch] = useReducer(viewRecordOverlayReducer, initialState)

    const addRecordId = (id) => {
        dispatch({ type: ADD_RECORD_ID, id })
    }

    const showViewForm = () => {
        dispatch({ type: SHOW_VIEW_FORM })
    }

    const hideViewForm = () => {
        dispatch({ type: HIDE_VIEW_FORM })

    }

    const showViewPreloader = () => {
        dispatch({ type: SHOW_VIEW_PRELOADER })

    }

    const hideViewPreloader = () => {
        dispatch({ type: HIDE_VIEW_PRELOADER })

    }

    const showViewOverlay = (id) => {
        dispatch({ type: SHOW_VIEW_OVERLAY })
        showViewPreloader()
        addRecordId(id)
    }

    const hideViewOverlay = () => {
        dispatch({ type: HIDE_VIEW_OVERLAY })
    }
    const fetchViewRecords = async (id) => {

        try {
            const res = await Axios.get(`https://react-app-23624.firebaseio.com/users/${USERID}/records/${id}/viewRecords.json`)
            if (res.data) {
                const payload = Object.keys(res.data).map(key => {
                    return {
                        ...res.data[key],
                        id: key
                    }
                })
                dispatch({
                    type: FETCH_VIEW_RECORDS, payload
                })
            } else {
                dispatch({
                    type: FETCH_VIEW_RECORDS, payload: []
                })
            }
            hideViewPreloader()
        } catch (error) {
            alert(error)
        }

    }
    const addViewRecord = async (title, description, id) => {
        showViewPreloader()
        const viewRecord = {
            title,
            description
        }

        try {
            const res = await Axios.post(`https://react-app-23624.firebaseio.com/users/${USERID}/records/${id}/viewRecords.json`, viewRecord)

            const payload = {
                ...viewRecord,
                id: res.data.name
            }

            dispatch({
                type: ADD_VIEW_RECORD,
                payload
            })


        } catch (error) {
            throw new Error('yo')
        }
        hideViewPreloader()
    }

    const removeViewRecord = async (viewRecordId) => {
        showViewPreloader()
        await Axios.delete(`https://react-app-23624.firebaseio.com/users/${USERID}/records/${state.recordId}/viewRecords/${viewRecordId}.json`)

        dispatch({
            type: REMOVE_VIEW_RECORD,
            payload: viewRecordId
        })
        hideViewPreloader()
    }

    const putViewRecord = async (title, description, id) => {
        const payload = {
            title,
            description,
            id
        }


        await Axios.put(`https://react-app-23624.firebaseio.com/users/${USERID}/records/${state.recordId}/viewRecords/${id}.json`, payload)

        const recordItem = state.viewRecords.findIndex(item => {
            return item.id === id
        })

        state.viewRecords[recordItem] = payload
    }

    return (
        <viewRecordOverlayContext.Provider value={{
            showViewForm, hideViewForm, showViewOverlay, hideViewOverlay, fetchViewRecords, addViewRecord, addRecordId, removeViewRecord, putViewRecord, viewRecords: state.viewRecords,
            visibleViewOverlay: state.visible, preloaderVisible: state.preloader, viewForm: state.viewForm, recordId: state.recordId
        }}>
            {children}
        </viewRecordOverlayContext.Provider>
    )
} 