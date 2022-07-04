import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Characters from "./components/characters/Characters"
import CharInfo from "./components/characters/CharInfo"
import CharacterApplication from "./components/character_application/CharacterApplication"
import SingleApp from "./components/character_application/SingleApp"
import EpiNewCreate from "./components/forms/epiNewCreate"
import Navigation from "./components/navbar/Navigation"
import ProfileEdit from "./components/profile/ProfileEdit"
import ProfileEditPass from "./components/profile/ProfileEditPass"
import SingleEpi from "./components/single_episode/singleEpi"
import Arrows from "./helpers/arrows"
import { MainPage, Profile, EpisodesPage, OrgPage, Outgame, Chats, CreateCharacter, ResetPass, ModerPage, AdminPage } from './pages/index'
import { addUserInfo } from "./store/usersSlice"
import { RolesList } from './pages/org_pages/org_index'

function App() {
    const dispatch = useDispatch()
    const url = 'https://api.postscriptum.games/v1/me'

    let options = {}

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
    }, [])

    return (
        <>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" exact element={<MainPage />} />
                    <Route path="/index" element={<MainPage />} />

                    <Route path="/episodes/:epiId" element={<SingleEpi />} />
                    <Route path="/episodes/template" element={<EpiNewCreate />} />
                    <Route path="/episodes" element={<EpisodesPage />} />

                    <Route path="/profile/:profId/edit/pass" element={<ProfileEditPass />} />
                    <Route path="/profile/:profId/edit" element={<ProfileEdit />} />
                    <Route path="/profile/:profId" element={<Profile />} />

                    <Route path="/resetPass" element={<ResetPass />} />

                    <Route path="/characters/:charId" element={<CharInfo />} />
                    <Route path="/characters" element={<Characters />} />

                    <Route path="/create" element={<CreateCharacter />} />
                    <Route path="/char_app/:appId" element={<SingleApp />} />
                    <Route path="/char_app" element={<CharacterApplication />} />

                    <Route path='/org/list_of_roles' element={<RolesList />} />
                    <Route path="/org" element={<OrgPage />} />


                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/moder" element={<ModerPage />} />

                    {/* <Route path="/outgame/" element={<Flood />} /> */}
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
