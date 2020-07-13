import React, { useContext, useEffect } from "react"
import "./Base.scss"
import { NotRecords } from "./NotRecords/NotRecords"
import { addRecordOverlayContext } from "../../context/addRecordOverlay/addRecordOverlayContext"
import { AddRecordOverlay } from "../../components/AddRecordOverlay/AddRecordOverlay"
import { FirebaseContext } from "../../context/firebase/firebaseContext"
import { Records } from "./Records/Records"
import { RecordOverlay } from "../../components/RecordOverlay/RecordOverlay"
import { NotAuthUser } from "../../components/NotAuthUser/NotAuthUser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faSearch } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import { Preloader } from "../../components/RecordOverlay/Preloader/Preloader"
import { USERID } from "../../context/types"
import { ViewRecordOverlay } from "../../components/ViewRecordOverlay/ViewRecordOverlay"


export const Base = () => {

    const { show } = useContext(addRecordOverlayContext)
    const { fetchRecords, records, preloader } = useContext(FirebaseContext)
    const showOverlay = () => {
        show()
    }

    const exitUser = () => {
        localStorage.removeItem('userId')
    }

    useEffect(() => {
        fetchRecords()
        // eslint-disable-next-line

    }, [])

    return (

        <section className="Base">
            {USERID ?
                <div>
                    <Preloader preloader={preloader} />
                    {!records.length ? <NotRecords /> : <Records records={records} />}
                    <AddRecordOverlay />
                    <RecordOverlay />
                    <ViewRecordOverlay />
                    <div className='basebtns'>
                        <button className="addRecordBtn" onClick={showOverlay}>+</button>
                        <NavLink to='/' onClick={exitUser} className="exitBtn"><FontAwesomeIcon icon={faDoorOpen}></FontAwesomeIcon></NavLink>
                    </div>
                </div>
                :
                <NotAuthUser />
            }
        </section>

    )
}