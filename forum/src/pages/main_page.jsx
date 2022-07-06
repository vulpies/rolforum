import React, { useState } from "react"
import { useSelector } from "react-redux"
import ProfileSlider from "../components/Slider"
import Login from "./login"
import { useNavigate } from 'react-router-dom'
import Registration from "./registration"
import CommonInputs from '../helpers/CommonInputs'
import CommonBigBtn from "../helpers/big_btn"
import {useTranslation} from "react-i18next";

const MainPage = () => {
    const { t, i18n } = useTranslation();
    const [user] = useSelector((state) => state.usersReducer.user)
    const userAuth = useSelector((state) => state.usersReducer.auth)
    const navigate = useNavigate()

    const [lostPass, setLostPass] = useState(true)
    const [email, setEmail] = useState('')

    const [hide, isHide] = useState(true)
    const [hideReg, isHideReg] = useState(true)

    const handleLogin = (e) => {
        e.preventDefault()
        isHide(prevState => !prevState)
        isHideReg(true)
    }

    const handleRegistration = (e) => {
        e.preventDefault()
        isHideReg(prevState => !prevState)
        isHide(true)
    }

    const showHide = () => {
        setLostPass(prevState => !prevState)
    }

    return (
        <div className="wrapper">
            <ProfileSlider />
            {!userAuth ?
                <div className='slider-ghost'>

                    <img src='https://sun1-16.userapi.com/s/v1/ig1/wLhBikGgAsxrvhrQ_0ZpIadj-0ONkrAGDbB2XVASX8bS_VxxHvKKH_nFm6HaVluDzsAIAkup.jpg?size=200x200&quality=96&crop=44,0,435,435&ava=1' alt='аватар гостя' />

                    <p className='slider-ghost__subtitle'><a href="/" onClick={handleLogin}> {t("pages_main_login")} </a> {t("pages_main_or")}
                        <a href='/'
                            onClick={handleRegistration}>
                            {t("pages_main_register")}
                        </a></p>

                    {hide ? '' : <Login />}
                    {hideReg ? '' : <Registration />}

                    <hr className="hr-line" />

                    <p className="login-pass"
                        onClick={showHide}>{t("pages_main_password_forgotten")}</p>

                    {lostPass ? ''
                        : <div className="login">
                            <div className="login-input">
                                <CommonInputs
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("pages_main_type_email")}
                                />
                            </div>

                            <input
                                type="submit"
                                className='btns btns-common btns-log'
                                value={t("pages_main_submit")}
                            />
                        </div>
                    }
                </div> : ''
            }

            {user ? (
                <CommonBigBtn
                    className="chars"
                    classNameBtn='btns btns-create'
                    onClick={() => navigate(`/characters`)}
                    name="Все персонажи"
                />
            )
                : ""}
        </div>

    )
}

export default MainPage
