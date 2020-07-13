import React, { useReducer } from "react"
import { settignsOverlayReducer } from "./settingsOverlayReducer"
import { settingOverlayContext } from "./settingsOverlayContext"
import Axios from "axios"
import { FETCH_DATA, SHOW_SETTINGS_OVERLAY, HIDE_SETTINGS_OVERLAY, CHANGE_TITLE, CHANGE_DESCRIPTION, SHOW_SETTINGS_PRELOADER, HIDE_SETTINGS_PRELOADER, USERID } from "../types"





export const SettingsOverlayState = ({ children }) => {
    const initialState = {
        title: '',
        description: '',
        id: '',
        preloader: true,
        visible: false,

    }

    const showPreloader = () => {
        dispatch({ type: SHOW_SETTINGS_PRELOADER })
    }

    const hidePreloader = () => {
        dispatch({ type: HIDE_SETTINGS_PRELOADER })

    }

    const [state, dispatch] = useReducer(settignsOverlayReducer, initialState)

    const showOverlay = () => {
        dispatch({ type: SHOW_SETTINGS_OVERLAY })
    }
    const hideOverlay = () => {
        dispatch({ type: HIDE_SETTINGS_OVERLAY })
        setTimeout(() => {
            showPreloader()
        }, 600)
    }
    const fetchData = async (id) => {
        showOverlay()
        const res = await Axios.get(`https://react-app-23624.firebaseio.com/users/${USERID}/records/${id}.json`)

        const payload = {
            title: res.data.title,
            description: res.data.description,
            id
        }
        dispatch({
            type: FETCH_DATA,
            payload
        })
        hidePreloader()
    }

    const changeTitle = (title) => {
        dispatch({ type: CHANGE_TITLE, title })
    }
    const changeDescription = (description) => {
        dispatch({ type: CHANGE_DESCRIPTION, description })
    }
    return (
        <settingOverlayContext.Provider value={{
            hideOverlay, fetchData, changeTitle, changeDescription, showPreloader, hidePreloader, state
        }}>
            {children}
        </settingOverlayContext.Provider>
    )
}