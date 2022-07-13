import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProfileSlider from "../components/Slider"
import Login from "./login"
import { useNavigate } from 'react-router-dom'
import Registration from "./registration"
import CommonInputs from '../helpers/CommonInputs'
import CommonBigBtn from "../helpers/big_btn"
import { useTranslation } from "react-i18next";
import stanger from '../images/stranger.jpg'
import { commonFetch } from "../helpers/commonFetch"

const MainPage = () => {
    const { t } = useTranslation();
    const [user] = useSelector((state) => state.usersReducer.user)
    const userAuth = useSelector((state) => state.usersReducer.auth)
    const navigate = useNavigate()
    const [main, setMain] = useState()
    const [showEpi, setShowEpi] = useState(true)

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


    useEffect(() => {
        commonFetch('https://api.postscriptum.games/v1/index', setMain)
    }, [setMain])

    const loadListOfEpies = () => {
        setShowEpi(!showEpi)
    }

    console.log(main, 8888)

    return (
        <div className="wrapper">
            <ProfileSlider />
            {!userAuth ?
                <div className='slider-ghost'>

                    <img src={stanger} alt='аватар гостя' />

                    <p className='slider-ghost__subtitle'><a href="/" onClick={handleLogin}> {t("pages.main_page.login")} </a> {t("pages.main_page.or")}&nbsp;
                        <a href='/'
                            onClick={handleRegistration}>
                            {t("pages.main_page.register")}
                        </a></p>

                    {hide ? '' : <Login />}
                    {hideReg ? '' : <Registration />}

                    <hr className="hr-line" />

                    <p className="login-pass"
                        onClick={showHide}>{t("pages.main_page.password_forgotten")}</p>

                    {lostPass ? ''
                        : <div className="login">
                            <div className="login-input">
                                <CommonInputs
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("pages.main_page.type_email")}
                                />
                            </div>

                            <input
                                type="submit"
                                className='btns btns-common btns-log'
                                value={t("pages.main_page.submit")}
                            />
                        </div>
                    }
                </div> : ''
            }

            {user ? (<>
                <CommonBigBtn
                    className="chars"
                    classNameBtn='btns btns-create'
                    onClick={() => navigate(`/characters`)}
                    name={t("pages.main_page.all_characters")}
                />

                <div className='main-new__wrapper'>

                    {main && main?.posts.length !== 0 ? <div className='main-new__episodes'>

                        <p>{t("pages.main_page.new_posts")} ({main?.posts.length})</p>


                        {main?.posts.length >= 3 ? <div className="main-new__show-btn">
                            <button className='btns btns-load' onClick={loadListOfEpies}>{showEpi ? t("pages.main_page.hide_episodes") : t("pages.main_page.load_episodes")}</button>
                        </div> : ''}


                        {showEpi ? <ul className='main-new__episodes-list'>
                            {main?.posts?.map((item, i) => {
                                return <li key={i + 1}>
                                    <a href={`/episodes/${item.episode_id}`}>{item.episode_title}</a><br />
                                    <p><span>{t("pages.main_page.written_by")}</span> {item.character_name}</p>
                                    <p><span>{t("pages.main_page.post_date")}</span> {item.created_at}</p>
                                </li>
                            })}
                        </ul> : ''}

                    </div> : <div className='main-new__no-episodes'>
                        <p>{t("pages.main_page.no_new_posts")}</p></div>}

                </div>
            </>) : ""
            }
        </div >

    )
}

export default MainPage
