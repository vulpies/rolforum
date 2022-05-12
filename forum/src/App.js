import axios from "axios"
import React, { useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Flood from "./components/Flood"
import EpiNewCreate from "./components/forms/epiNewCreate"
import NavbarCommon from "./components/navbar/navbar_common"
import ProfileEdit from "./components/profile/ProfileEdit"
import Arrows from "./helpers/arrows"
import Chats from "./pages/chats_page"
import { MainPage, Profile, Registration, EpisodesPage, SingleEpi, OrgPage, Outgame } from './pages/index'
import { addUserInfo } from "./store/usersSlice"

function App() {
    const dispatch = useDispatch()
    const url = 'https://api.rolecrossways.com/v1/me'

    let options = useMemo(() => { }, [])

    if (localStorage.getItem('token')) {
        options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    }

    useEffect(() => {
        axios.get(url, options)
            .then(res => {
                if (res.data.code === 401) {
                    localStorage.removeItem('token')
                } else {
                    if (res.data.user_id !== null) {
                        dispatch(addUserInfo(res.data))
                    }
                }
            })
            .catch(err => console.log(err))
    }, [dispatch, options])

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
                    <Route path="/profile/:profId/edit" element={<ProfileEdit />} />
                    <Route path="/profile/:profId" element={<Profile />} />
                    <Route path="/org" element={<OrgPage />} />
                    <Route path="/outgame/chat" element={<Flood />} />
                    <Route path="/outgame" element={<Outgame />} />
                    <Route path="/chats" element={<Chats />} />
                    <Route path="/exit" element={<Navigate to="/" replace />}
                    />
                </Routes>
                <Arrows className='main-page__arrow' />
            </BrowserRouter>
        </>
    )
}

export default App
