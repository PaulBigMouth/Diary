import React from 'react'
import "./AuthInput.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export const AuthInput = (props) => {

    const onChangeInput = () => {
        if (props.onValid) {
            props.onValid()
        }
        if (props.onText) {
            props.onText()
        }
    }
    return (
        <div id="AuthInput">

            <input type={props.type} className="AuthInput" placeholder={props.title} required id={props.id} onChange={onChangeInput} />
            <div className="authIcon">
                <FontAwesomeIcon icon={props.icon} className="authInputIcon" />
            </div>


        </div>
    )
}


