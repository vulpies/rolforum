import axios from "axios"
import React, { useEffect, useState } from "react"
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
import LocaleContext from "./helpers/LocaleContext";
import Arrows from "./helpers/arrows"
import { MainPage, Profile, EpisodesPage, OrgPage, Outgame, Chats, CreateCharacter, ResetPass, ModerPage, AdminPage, AboutUs, GuestsPage } from './pages/index'
import { addUserInfo } from "./store/usersSlice"
import { News, SingleNews } from './pages/org_pages/org_index'
import { RolesList, UsersList, FAQ } from './pages/for_guests/guests_index'
import i18n from "./services/i18n";
import CreateChat from "./components/flood/CreateChat"
import { EditPost, EditFloodMsg, EditAppCom } from './components/edit_forms/edit_index'
import PageNotFound from "./pages/404"


function App() {
    const [locale, setLocale] = useState(i18n.language);
    const dispatch = useDispatch()
    const url = 'https://api.postscriptum.games/v1/me'

    let options = {}

    i18n.on('languageChanged', (lng) => setLocale(i18n.language));

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
                    i18n.changeLanguage(res.data.language)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <LocaleContext.Provider value={{ locale, setLocale }}>
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/" exact element={<MainPage />} />
                        <Route path="/index" element={<MainPage />} />

                        <Route path='/guestbook/list_of_users' element={<UsersList />} />
                        <Route path='/guestbook/list_of_roles' element={<RolesList />} />
                        <Route path='/guestbook/faq' element={<FAQ />} />
                        <Route path="/guestbook" element={<GuestsPage />} />

                        <Route path="/episodes/edit/:epiPostId" element={<EditPost />} />
                        <Route path="/episodes/:epiId" element={<SingleEpi />} />
                        <Route path="/episodes/template" element={<EpiNewCreate />} />
                        <Route path="/episodes" element={<EpisodesPage />} />

                        <Route path="/profile/:profId/edit/pass" element={<ProfileEditPass />} />
                        <Route path="/profile/:profId/edit" element={<ProfileEdit />} />
                        <Route path="/profile/:profId" element={<Profile />} />

                        <Route path="/resetPass" element={<ResetPass />} />
                        {/* <Route path="/edit_msg" element={<EditMessage />} /> */}

                        <Route path="/characters/:charId" element={<CharInfo />} />
                        <Route path="/characters" element={<Characters />} />

                        <Route path="/create" element={<CreateCharacter />} />
                        <Route path="/char_app/edit/:appComId" element={<EditAppCom />} />
                        <Route path="/char_app/:appId" element={<SingleApp />} />
                        <Route path="/char_app" element={<CharacterApplication />} />

                        {/* <Route path='/org/actions' element={<Actions />} />
                        <Route path='/org/looking_for' element={<LookingFor />} /> */}
                        <Route path='/org/news/:newsId' element={<SingleNews />} />
                        <Route path='/org/news' element={<News />} />
                        <Route path="/org" element={<OrgPage />} />

                        <Route path="/about_us" element={<AboutUs />} />

                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/moder" element={<ModerPage />} />

                        <Route path="/outgame" element={<Outgame />} />

                        <Route path="/chats/create_chat" element={<CreateChat />} />
                        <Route path="/chats/edit/:chatMsgId" element={<EditFloodMsg />} />
                        <Route path="/chats/:chatId" element={<Chats />} />

                        <Route path="/exit" element={<Navigate to="/" replace />}
                        />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <Arrows className='main-page__arrow' />
                </BrowserRouter>
            </LocaleContext.Provider>
        </>
    )
}

export default App
