import React from "react"
import "./Register.scss"
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { AuthInput } from "../../components/AuthInput/AuthInput"
import { emailValid, SubmitRegisterFormHandler } from "../../valid/valid"

export const Register = () => {

    return (
        <section className="Auth">
            <div className="AuthBox">
                <div className="container">
                    <div className="AuthBoxInner">
                        <div className="AuthLogo">
                            <FontAwesomeIcon icon={faBook} className="AuthIcon fa-2x" />
                        </div>
                        <div className="AuthInputs">
                            <AuthInput type="email" id="AuthEmail" title="Электронная почта" onValid={() => emailValid(document.querySelector('#AuthEmail'))} />
                            <AuthInput type="password" id="AuthPassword" title="Пароль" />
                        </div>
                        <div className="footerAuth">
                            <span className="errorAuth">_</span>
                            <button className="AuthBtn" onClick={SubmitRegisterFormHandler}>Зарегистрироваться</button>
                            <NavLink className="AuthLink" to="/">Есть аккаунт?</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}