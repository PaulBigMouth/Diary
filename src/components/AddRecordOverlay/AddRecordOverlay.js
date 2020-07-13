import React, { useContext } from "react"
import { CSSTransition } from "react-transition-group"
import "./AddRecordOverlay.scss"
import { addRecordOverlayContext } from "../../context/addRecordOverlay/addRecordOverlayContext"
import { FirebaseContext } from "../../context/firebase/firebaseContext"

export const AddRecordOverlay = () => {

    const { overlay, hide } = useContext(addRecordOverlayContext)
    const { addRecord } = useContext(FirebaseContext)

    const hideOverlayAfterAddRecord = (title, description) => {
        if (title.trim() && description.trim()) {
            addRecord(title, description)
            hide()
        }
    }
    return (
        <CSSTransition in={overlay.visible} timeout={300} classNames="overlayTransition" mountOnEnter
            unmountOnExit>
            <div id="overlay">
                <div className="overlay" onClick={hide}></div>
                <div className="overlayWindowAddRecord">
                    <div className="container">
                        <div className="overlayWindowAddRecordInner">
                            <form>
                                <div className="addRecordTitle">
                                    <label>Название:</label>
                                    <input required type='text' id='addRecordTitleInput' maxLength={50} />
                                </div>
                                <div className="addRecordDescription">
                                    <label>Описание:</label>
                                    <textarea required id="addRecordDescriptionInput" maxLength={150} />
                                </div>

                                <p className="addRecordOverlayBtn">
                                    <button id='addRecordOverlayBtn' onClick={(e) => {
                                        e.preventDefault()
                                        hideOverlayAfterAddRecord(document.querySelector('#addRecordTitleInput').value, document.querySelector('#addRecordDescriptionInput').value)
                                    }}>Добавить</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}
