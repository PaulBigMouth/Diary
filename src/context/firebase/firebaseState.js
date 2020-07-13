import React, { useReducer } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { ADD_RECORD, REMOVE_RECORD, FETCH_RECORD, SHOW_PRELOADER, HIDE_PRELOADER, USERID } from '../types'


export const FirebaseState = ({ children }) => {

    const initialState = {
        records: [],
        preloader: true
    }

    const showPreloader = () => {
        dispatch({ type: SHOW_PRELOADER })
    }
    const hidePreloader = () => {
        dispatch({ type: HIDE_PRELOADER })
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const addRecord = async (title, description) => {

        const record = {
            title, description
        }

        try {
            const res = await axios.post(`https://react-app-23624.firebaseio.com/users/${USERID}/records.json`, record)

            const payload = {
                ...record,
                id: res.data.name
            }

            dispatch({
                type: ADD_RECORD,
                payload
            })
        } catch (e) {
            alert(e)
        }
    }

    const removeRecord = async id => {
        await axios.delete(`https://react-app-23624.firebaseio.com/users/${USERID}/records/${id}.json`)

        dispatch({
            type: REMOVE_RECORD,
            payload: id
        })
    }

    const fetchRecords = async () => {
        const res = await axios.get(`https://react-app-23624.firebaseio.com/users/${USERID}/records.json`)

        if (res.data) {
            const payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            })

            dispatch({
                type: FETCH_RECORD, payload
            })
        }
        hidePreloader()
    }
    const putRecord = async (title, description, id) => {

        const payload = {
            title,
            description,
            id
        }


        await axios.put(`https://react-app-23624.firebaseio.com/users/${USERID}/records/${id}.json`, payload)

        const recordItem = state.records.findIndex(item => {
            return item.id === id
        })

        state.records[recordItem] = payload
    }

    return (
        <FirebaseContext.Provider value={{
            fetchRecords, addRecord, removeRecord, putRecord, records: state.records, preloader: state.preloader
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}