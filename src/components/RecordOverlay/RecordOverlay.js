import React, { useContext, useState } from "react"
import "./RecordOverlay.scss"
import { CSSTransition } from 'react-transition-group'
import { DeleteRecordOverlay } from "./DeleteRecordOverlay/DeleteRecordOverlay"
import { settingOverlayContext } from "../../context/settingsOverlay/settingsOverlayContext"
import { FirebaseContext } from "../../context/firebase/firebaseContext"
import { Preloader } from "./Preloader/Preloader"

export const RecordOverlay = () => {

    const { state, hideOverlay, changeTitle, changeDescription } = useContext(settingOverlayContext)
    const { putRecord, removeRecord } = useContext(FirebaseContext)
    const [deleteVisible, setDeleteVisible] = useState(false)

    return (
        <CSSTransition
            in={state.visible}
            timeout={300}
            classNames={'overlayTransition'}
            mountOnEnter
            unmountOnExit
        >
            <div id="overlay">
                <div className="overlay" onClick={hideOverlay}></div>
                <div className="overlayWindowAddRecord">

                    <div className="settingsOverlayWindow">
                        <div className="settignsOverlayLeft">
                            <ul>

                            </ul>
                        </div>
                        <div className="settingsOverlayRight">
                            <div className="settingsOverlayRightInner">
                                <div className="settingsOverlayRightItem formItem">
                                    <form>
                                        <div className="settingsTitle">
                                            <label>Название:</label>
                                            <input required type="text" value={state.title} onChange={(e) => changeTitle(e.target.value)} maxLength={50} />
                                        </div>
                                        <div className="settingsDescription">
                                            <label>Описание:</label>
                                            <textarea required value={state.description} onChange={(e) => changeDescription(e.target.value)} maxLength={150} />
                                        </div>
                                        <div className="settingsFormBtn">
                                            <span className='delete' onClick={() => setDeleteVisible(true)}>Удалить</span>
                                            <span className='save' onClick={() => putRecord(state.title, state.description, state.id)}>Сохранить</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DeleteRecordOverlay hideOverlay={hideOverlay} deleteVisible={deleteVisible} title={state.title} recordId={state.id} onRemove={removeRecord} onClose={() => setDeleteVisible(false)} />
                    <Preloader preloader={state.preloader} />
                </div>
            </div>

        </CSSTransition>

    )
}