import React, { useEffect, useContext } from 'react'
import "./ViewRecordOverlay.scss"
import { CSSTransition } from 'react-transition-group'

import { viewRecordOverlayContext } from '../../context/viewRecordOverlay/viewRecordOverlayContext'
import { ViewForm } from "./ViewForm/ViewForm"
import { ViewRecord } from './ViewRecord/ViewRecord'
import { NotViewRecords } from "./NotViewRecords/NotViewRecord"
import { Preloader } from "../RecordOverlay/Preloader/Preloader"


export const ViewRecordOverlay = () => {

    const { fetchViewRecords, showViewForm, hideViewForm, viewForm, visibleViewOverlay, hideViewOverlay, addViewRecord, viewRecords, recordId, preloaderVisible, removeViewRecord, putViewRecord } = useContext(viewRecordOverlayContext)

    useEffect(() => {
        if (visibleViewOverlay) {
            fetchViewRecords(recordId)
        }
    }, [visibleViewOverlay])
    return (
        <CSSTransition
            in={visibleViewOverlay}
            timeout={400}
            classNames={'viewOverlayTransition'}
            mountOnEnter
            unmountOnExit
        >
            <div id="viewOverlay">
                <div className="viewOverlay" onClick={hideViewOverlay}></div>
                <div className="viewOverlayWindow">
                    <div className="container">
                        <div className="viewOverlayWindowInner">
                            <div className="viewOverlayRecords">
                                <ul>
                                    {viewRecords.length ? viewRecords.map((item, index) => {
                                        return (
                                            <li key={item.id}>
                                                <ViewRecord index={index} onPut={putViewRecord} title={item.title} description={item.description} id={item.id} onRemove={removeViewRecord} />
                                            </li>
                                        )
                                    }) : <NotViewRecords />}

                                </ul>
                            </div>
                            <div className="addViewRecordBtn">
                                <button onClick={showViewForm}>+</button>
                            </div>
                        </div>
                    </div>
                    <ViewForm onClose={hideViewForm} visible={viewForm} addRecord={addViewRecord} recordId={recordId} onPut={putViewRecord} />
                    <Preloader preloader={preloaderVisible} />
                </div>
            </div>
        </CSSTransition>
    )
}