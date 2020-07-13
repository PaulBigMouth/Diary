import React from "react"
import "./NotAuthUser.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

export const NotAuthUser = () => (
    <section className="notAuthUser">
        <div className="notAuthUserBox">
            <div><FontAwesomeIcon className="fa-3x warningIcon" icon={faExclamationTriangle} /></div>
            <p>Вы не авторизованы! <NavLink to='/'>Авторизуйтесь</NavLink> или <NavLink to="/register">зарегистрируйтесь</NavLink>, если хотите продолжить.</p>
        </div>
    </section>
)