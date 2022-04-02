import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProfileSlider from "../components/Slider"
import Login from "./login"

const MainPage = () => {
    const userAuth = useSelector((state) => state.usersReducer.auth)
    const [hide, isHide] = useState(true)

    const handleLogin = (e) => {
        e.preventDefault()
        isHide(prevState => !prevState)
    }
    return (
        <div className="wrapper">
            <ProfileSlider />
            {userAuth === false ?
                < div className='slider-ghost'>
                    <img src='https://sun1-16.userapi.com/s/v1/ig1/wLhBikGgAsxrvhrQ_0ZpIadj-0ONkrAGDbB2XVASX8bS_VxxHvKKH_nFm6HaVluDzsAIAkup.jpg?size=200x200&quality=96&crop=44,0,435,435&ava=1' alt='аватар гостя' />
                    <p className='slider-ghost__subtitle'><a href="/" onClick={handleLogin}>
                        Войдите
                    </a> или <Link to='/registration'>зарегистрируйтесь</Link></p>
                    {hide === true ? '' : <Login />} </div> : ''
            }
        </div>

    )
}

export default MainPage
