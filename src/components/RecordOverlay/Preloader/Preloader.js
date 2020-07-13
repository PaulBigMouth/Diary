import React from "react"
import "./Preloader.scss"
import { CSSTransition } from "react-transition-group"

export const Preloader = ({ preloader }) => (
    <CSSTransition
        in={preloader}
        timeout={400}
        classNames={'settingsPreloader'}
        unmountOnExit
    >

        <div className="preloaderBox">
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    </CSSTransition>
)