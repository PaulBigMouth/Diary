import React from 'react'
import "./Auth.scss"
import { NavLink } from 'react-router-dom'

import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons'
import { AuthInput } from "../../components/AuthInput/AuthInput"
import { emailValid, submitAuthFormHandler, errorTextRemove } from "../../valid/valid"


export const Auth = () => {


    return (
        <section className="Auth authimg">
            <div className="AuthBox">
                <div className="container">
                    <div className="AuthBoxInner">
                        <div className="AuthText">
                            <h2>Авторизация</h2>
                            <p>Введите свои данные</p>
                        </div>
                        <div className="AuthInputs">
                            <AuthInput type="email" id="AuthEmail" icon={faUser} title="Электронная почта" onText={() => errorTextRemove(document.querySelector('.errorAuth'), document.querySelector('#AuthEmail'))} onValid={() => emailValid(document.querySelector('#AuthEmail'))} />
                            <AuthInput type="password" id="AuthPassword" icon={faUnlockAlt} title="Пароль" onText={() => errorTextRemove(document.querySelector('.errorAuth'), document.querySelector('#AuthPassword'))} />
                        </div>
                        <div className="footerAuth">
                            <span className="errorAuth">_</span>
                            <button className="AuthBtn" onClick={submitAuthFormHandler}>Войти</button>
                            <NavLink className="AuthLink" to="/register">Регистрация</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

