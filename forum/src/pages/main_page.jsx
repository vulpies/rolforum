import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import NavbarCommon from "../components/navbar/navbar_common"
import ProfileSlider from "../components/slider/Slider"
import { getOneUser } from "../store/usersSlice"
import Login from "./login"

const MainPage = () => {
    const user = useSelector((state) => state.usersReducer.user)

    const dispatch = useDispatch()

    const url = 'http://api.rolecrossways.com/v1/me'

    useEffect(() => {
        axios.get(url, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
            .then(res =>
                dispatch(getOneUser(res.data.user_name)))
            .catch(err => console.log(err))
    }, [user, dispatch])

    const [hide, isHide] = useState(true)

    const handleLogin = (e) => {
        e.preventDefault()
        isHide(prevState => !prevState)
    }
    return (
        <>
            <NavbarCommon />
            <div className="wrapper">
                <ProfileSlider />
                {(user === 'гость' || user === undefined || user === null) ?
                    < div className='slider-ghost'>
                        <img src='https://sun1-16.userapi.com/s/v1/ig1/wLhBikGgAsxrvhrQ_0ZpIadj-0ONkrAGDbB2XVASX8bS_VxxHvKKH_nFm6HaVluDzsAIAkup.jpg?size=200x200&quality=96&crop=44,0,435,435&ava=1' alt='аватар гостя' />
                        <p className='slider-ghost__subtitle'><a href="/" onClick={handleLogin}>
                            Войдите
                        </a> или <Link to='/registration'>зарегистрируйтесь</Link></p>
                        {hide === true ? '' : <Login />} </div> : ''
                }
            </div>
        </>
    )
}

export default MainPage
