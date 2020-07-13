import React, { useContext, useState } from 'react'
import './Records.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { settingOverlayContext } from '../../../context/settingsOverlay/settingsOverlayContext'
import { viewRecordOverlayContext } from '../../../context/viewRecordOverlay/viewRecordOverlayContext'


export const Records = ({ records }) => {

    const { fetchData } = useContext(settingOverlayContext)
    const { showViewOverlay } = useContext(viewRecordOverlayContext)
    const [searchTitle, setSearchTitle] = useState()
    const searchRecord = (title) => {
        const records = document.querySelectorAll('.recordListItem')
        console.log(title)
        if (!title) {
            return records.forEach(item => {
                item.style.display = 'block'
            })
        }
        records.forEach(item => {
            if (item.dataset.title.toUpperCase() !== title.toUpperCase()) {
                item.style.display = 'none'
            }
        })
    }

    return (
        <div className='container'>
            <div className="searchRecord">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    searchRecord(searchTitle)
                }}>
                    <input className="searchRecordInput" type="text" placeholder="Введите название" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                </form>
            </div>
            <ul className="recordsList">
                {records.map((record, index) => {
                    return (
                        <li className="recordListItem" key={record.id} data-title={record.title}>
                            <section className="recordItem">
                                <div className="recordItemInner" onClick={() => {
                                    showViewOverlay(record.id)
                                }}>
                                    <h3>{record.title}</h3>
                                    <p>{record.description}</p>

                                </div>
                                <div className="recordSettingsBtn">
                                    <FontAwesomeIcon icon={faCogs} onClick={() => fetchData(record.id)} />
                                </div>
                            </section>
                        </li>
                    )
                })}
            </ul>
        </div>

    )

}