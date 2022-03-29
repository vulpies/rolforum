import axios from "axios"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NavbarCommon from "./components/navbar/navbar_common"
import { MainPage, Profile, Registration, EpisodesPage, SingleEpi, OrgPage, Outgame } from './pages/index'
import { getUserInfo } from "./store/usersSlice"

function App() {
    const userAuth = useSelector((state) => state.usersReducer.auth)
    const dispatch = useDispatch()
    const url = 'https://api.rolecrossways.com/v1/me'

    useEffect(() => {
        axios.get(url, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
            .then(res => dispatch(getUserInfo(res.data)))
            .catch(err => console.log(err))
    }, [dispatch])

    return (
        <>
            <BrowserRouter>
                <NavbarCommon />
                <Routes>
                    <Route path="/" exact element={<MainPage />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/episodes/:epiId" element={<SingleEpi />} />
                    <Route path="/episodes" element={<EpisodesPage />} />
                    <Route path="/profile" element={userAuth ? <Profile /> : (<Navigate replace to='/' />)} />
                    <Route path="/org" element={userAuth ? <OrgPage /> : (<Navigate replace to='/' />)} />
                    <Route path="/outgame" element={userAuth ? <Outgame /> : (<Navigate replace to='/' />)} />
                    <Route path="/exit" element={<Navigate to="/" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
