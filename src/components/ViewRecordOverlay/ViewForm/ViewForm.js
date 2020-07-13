import React, { useState } from 'react'
import './ViewForm.scss'
import { CSSTransition } from 'react-transition-group'


export const ViewForm = ({ onClose, visible, addRecord, recordId }) => {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    return (
        <CSSTransition
            in={visible}
            timeout={300}
            classNames={'viewFormTransition'}
            unmountOnExit
            mountOnEnter
        >
            <div className="addViewRecordForm">

                <div className="container">
                    <form>

                        <div className="viewRecordTitleForm">
                            <label>Название:</label>
                            <input className="viewRecordTitleInput" required type="text" value={title} maxLength={50} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="viewRecordDescriptionForm">
                            <label>Описание:</label>
                            <textarea className="viewRecordDescriptionInput" required value={description} maxLength={250} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <p className="viewRecordBtnForm">
                            <span className='viewFormCancel' onClick={onClose}>Отмена</span>
                            <span className="viewFormAccept" onClick={() => {
                                addRecord(title, description, recordId)
                                setTimeout(() => {
                                    setTitle('')
                                    setDescription('')
                                    onClose()
                                }, 1000)
                            }}>Добавить</span>
                        </p>

                    </form>
                </div>
            </div>
        </CSSTransition>
    )
}