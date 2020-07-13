import React from 'react'
import "./DeleteRecordOverlay.scss"
import { CSSTransition } from 'react-transition-group'



export const DeleteRecordOverlay = ({ hideOverlay, recordId, title, onRemove, deleteVisible, onClose }) => {
    const deleteRecord = (id) => {
        onRemove(id)
        onClose()
        hideOverlay()
    }

    return (
        <CSSTransition
            in={deleteVisible}
            timeout={300}
            classNames={'deleteOverlay'}
            mountOnEnter
            unmountOnExit

        >
            <div className="DeleteRecordOverlay">
                <p>Вы действительно хотите удалить {title}</p>
                <div className="deleteRecordOverlayBtn">
                    <button className="deleteRecordNo" onClick={onClose}>Нет</button>
                    <button className="deleteRecordYes" onClick={() => deleteRecord(recordId)}>Да</button>
                </div>
            </div>
        </CSSTransition>
    )
}