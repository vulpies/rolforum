import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NavbarCommon from "./components/navbar/navbar_common"
import EpiNewCreate from "./pages/epiNewCreate"
import { MainPage, Profile, Registration, EpisodesPage, SingleEpi, OrgPage, Outgame } from './pages/index'
import { addUserInfo } from "./store/usersSlice"

function App() {
    const dispatch = useDispatch()
    const url = 'https://api.rolecrossways.com/v1/me'

    useEffect(() => {
        axios.get(url, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
            .then(res => {
                if (res.data.code === 401) {
                    localStorage.removeItem('token')
                } else {
                    dispatch(addUserInfo(res.data))
                }
            })
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
                    <Route path="/episodes/template" element={<EpiNewCreate />} />
                    <Route path="/episodes" element={<EpisodesPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/org" element={<OrgPage />} />
                    <Route path="/outgame" element={<Outgame />} />
                    <Route path="/exit" element={<Navigate to="/" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
