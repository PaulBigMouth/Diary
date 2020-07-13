import React, { useState } from 'react'
import './ViewRecord.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

export const ViewRecord = ({ title, description, onRemove, id, index, onPut }) => {

    const [viewRecordTitle, setViewRecordTitle] = useState(title)
    const [viewRecordDescription, setViewRecordDescription] = useState(description)

    const changeEdit = (index) => {
        const titleInputs = document.querySelectorAll('.viewRecordTitleInput')
        const descriptionInputs = document.querySelectorAll('.viewRecordDescriptionInput')
        const putBtns = document.querySelectorAll('.viewRecordPut')
        const saveBtns = document.querySelectorAll('.putViewRecordBtn')
        console.log(this)
        if (titleInputs[index].getAttribute('readOnly') === '' || titleInputs[index].getAttribute('readOnly')) {
            titleInputs[index].removeAttribute('readOnly')
            descriptionInputs[index].removeAttribute('readOnly')
            putBtns[index].classList.add('on')
            saveBtns[index].classList.add('on')
        } else {
            titleInputs[index].setAttribute('readOnly', true)
            descriptionInputs[index].setAttribute('readOnly', true)

            putBtns[index].classList.remove('on')
            saveBtns[index].classList.remove('on')

            putBtns[index].classList.add('hide')
            saveBtns[index].classList.add('hide')

            setTimeout(() => {
                putBtns[index].classList.remove('hide')
                saveBtns[index].classList.remove('hide')
            }, 200)

        }
        console.log(titleInputs[index].getAttribute('readOnly'))


    }



    return (
        <div className="viewRecord">
            <div className="container">
                <form>
                    <div className="viewRecordTitle">
                        <input type="text" required className="viewRecordTitleInput" value={viewRecordTitle} onChange={(e) => setViewRecordTitle(e.target.value)} readOnly />
                        <div className="viewRecordBtns">
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => onRemove(id)} />
                            <FontAwesomeIcon icon={faEdit} onClick={() => changeEdit(index)} className="viewRecordPut" />
                        </div>
                    </div>
                    <div className="viewRecordDecription">
                        <textarea className="viewRecordDescriptionInput" value={viewRecordDescription} onChange={(e) => setViewRecordDescription(e.target.value)} readOnly maxLength={140} />
                    </div>
                    <button className="putViewRecordBtn" onClick={(e) => {
                        e.preventDefault()
                        onPut(viewRecordTitle, viewRecordDescription, id)
                        changeEdit(index)
                    }}>Сохранить</button>
                </form>
            </div>
        </div >
    )
}